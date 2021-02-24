<template>
  <div class="container">
    <div class="title">OFFERS</div>
    <select v-model.trim="selected" required @change="currentOffer">
      <option disabled value>Select a user</option>
      <option v-for="(user, index) in users" :key="index">{{ user }}</option>
    </select>

    <!-- display offer list for selected user -->
    <div>
      <!-- show offers for selected user -->
      <div v-if="offers.length > 0">
        <ul class="offer-list">
          <li class="list-title">Username | Date</li>
          <li v-for="(offer, index) in offers" :key="index">
            <!-- display all offers for a selected user -->
            <div v-if="offer.date.length > 0" class="sub-list">
              <li
                v-for="(item, index) in offer.date"
                :key="index"
                @click="showOffer"
              >{{ offer.username }} | {{ item }}</li>
            </div>
            <!-- display when user has only one offer -->
            <div v-else>{{ offer.username }} | {{ offer.date }}</div>
          </li>
        </ul>
      </div>
      <!-- show place mark when no user is selected -->
      <div v-else>Select a user to see offer list</div>
    </div>

    <div v-if="csv.length > 0" class="contents">
      <div class="hash">
        <div class="content-header">
          <h4>Hash</h4>
          <button
            type="button"
            :class="classObject"
            class="badge"
            @click="getHashEvents"
            :disabled="!isVerified"
          >{{ status }}</button>
        </div>
        <div v-tooltip="hash" class="hash">{{ hash }}</div>
      </div>

      <div class="csv">
        <h4>CSV</h4>
        <ol>
          <li v-for="(data, index) in csv" :key="index">{{ data }}</li>
        </ol>
      </div>

      <div class="verify-button">
        <button type="button" class="button" @click="verify">Verify</button>
      </div>
    </div>

    <div v-if="rootHashError" class="error">
      <div class="message">
        <strong>Error!</strong>
        <br />No Merkle root hash found for
        <i>
          <b>{{ date }}</b>
        </i>
        .
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const { MerkleTree } = require("merkletreejs");
const SHA256 = require("crypto-js/sha256");
const axios = require("axios");
import Contract from "@/assets/js/contractInstance";
export default {
  name: "Offers",
  data() {
    return {
      entries: "",
      selected: "",
      users: [],
      offers: [],
      key: "",
      date: "",
      csv: [],
      display: "",
      hash: "",
      status: "Un-verified",
      rootHashError: "",
      // notifications
      isFound: "",
      isFailed: "",
      isVerified: "",
    };
  },
  computed: {
    classObject: function () {
      return {
        verified: this.isFound && this.isVerified && !this.isFailed,
        warning: !this.isFound && !this.isVerified && !this.isFailed,
        failed: this.isFound && !this.isVerified && this.isFailed,
      };
    },
  },
  methods: {
    // get locally stored offers
    getOffers() {
      this.entries = Object.entries(window.localStorage);

      this.entries.forEach((entry) => {
        if (entry[0] != "loglevel:webpack-dev-server") {
          let value = JSON.parse(entry[1]);
          this.users.push(value.username);
        }
      });
      // remove duplicates
      this.users = Array.from(new Set(this.users));
    },

    // keep record of offers for a user
    currentOffer() {
      this.reset();
      this.entries.forEach((entry) => {
        if (entry[0] != "loglevel:webpack-dev-server") {
          let value = JSON.parse(entry[1]);

          if (value.username === this.selected) {
            let index = this.offers.findIndex(
              (offer) => offer.username === this.selected
            );
            if (index === -1) {
              this.offers.push({
                key: [value.key],
                username: value.username,
                date: [value.date],
                hash: [value.hash],
                text: [value.text],
              });
            } else {
              this.offers[index].date.push(value.date);
              this.offers[index].hash.push(value.hash);
              this.offers[index].text.push(value.text);
            }
          }
        }
      });

      document.querySelectorAll(".sub-list > li").forEach((li) => {
        li.classList.remove("active-offer");
      });
    },

    // display selected offer
    showOffer() {
      // clear status for new selection
      this.status = "Un-verified";
      this.rootHashError = "";
      this.isVerified = false;
      this.isFailed = false;
      this.isFound = false;
      let info = event.target.innerHTML;
      let infoArr = info.split("|");
      this.key = infoArr[0].trim() + "|" + infoArr[1].trim();
      // find & display offer for key
      this.entries.forEach((entry) => {
        if (entry[0] === this.key) {
          let data = JSON.parse(entry[1]);
          let rows = data.text.split("\n");
          this.csv = [];
          this.csv.push(...rows);
          this.hash = data.hash;
        }
      });

      // removing the background color for ul-selected items
      document.querySelectorAll(".sub-list > li").forEach((li) => {
        li.classList.remove("active-offer");
      });
      // add background to selected account
      event.target.classList.add("active-offer");
    },

    getHashEvents() {
      this.contract.events
        .NewHash({
          fromBlock: 0,
        })
        .on("data", (event) => {
          if (this.date == event.returnValues.date) {
            let hash = event.transactionHash;
            let url = `https://explorer.anyblock.tools/ethereum/ewf/volta/tx/${hash}/`;
            window.open(url);
          }
        })
        .on("error", console.error);
    },

    // verifiy selected offer
    async verify() {
      let url = "https://verify.flexibilitaetsmarkt.de:3000/api/offers/proof";
      // retrieve username and date from selected key
      let user = this.key.split("|");
      let username = user[0];
      this.date = user[1];
      let leaf = this.hash;

      const tree = new MerkleTree([], SHA256);
      let root = await this.getRootHash(this.date);
      if (root[0] != "") {
        this.rootHashError = false;
        root = root[0];
        axios
          .get(url, {
            params: {
              username: username,
              date: this.date,
            },
          })
          .then((res) => {
            if ("message" in res.data) {
              this.status = "Hash Not Found";
              this.isFound = false;
            } else {
              //let proof = res.data.pf
              const proof = res.data.map((object) => {
                object.data = Buffer.from(object.data.data);
                return object;
              });
              const result = tree.verify(proof, leaf, root);
              if (result) {
                this.status = "Verified";
                this.isVerified = true;
                this.isFailed = false;
                this.isFound = true;
              } else {
                this.status = "Verification Failed";
                this.isFailed = true;
                this.isVerified = false;
                this.isFound = true;
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.rootHashError = true;
      }
    },

    // get merkle root hash
    async getRootHash(timestamp) {
      let root = await this.contract.methods.getHash(timestamp).call();
      return root;
    },

    reset() {
      this.hash = "";
      this.csv = [];
      this.offers = [];
      this.rootHashError = false;
      this.isFound = "";
      this.isFailed = "";
      this.isVerified = "";
    },
  },

  async created() {
    this.contract = await Contract();
    this.getOffers();
    //this.getRootHash('2020-08-28')
  },
};
</script>

<style>
.offers {
  margin-top: 2rem;
  border-radius: 2px;
  background: rgb(250, 250, 250);
  box-shadow: 0 10px 30px rgba(51, 51, 51, 0.1);
}

select {
  padding: 0.7rem !important;
  margin-top: 2rem !important;
  outline: none;
}

.offer-list {
  margin: 0;
  padding: 0;
  height: 200px;
  overflow-y: auto;
  list-style-type: none;
  text-align: left;
  background: rgb(240, 239, 239);
}

.sub-list > li,
.list-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.7rem;
  font-size: 1em;
  background-color: rgb(241, 237, 237);
  border-left: 3px solid rgb(0, 128, 194);
  margin-bottom: 2px;
  color: #3e5252;
  cursor: pointer;
}

.offer-list > .list-title {
  border: none;
  font-weight: bold;
  text-align: center;
}

.contents {
  padding: 1.2rem;
  margin: 2rem 0rem;
  height: 360px;
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(192, 192, 191);
}

.csv {
  padding: 0.5rem;
  margin-top: 1rem;
  height: 200px;
  overflow-y: auto;
  border: 1px solid rgb(192, 192, 191);
}

.content-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.hash {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge {
  border: none;
  outline: none;
  color: #2c3e50;
  padding: 0.8rem 0.5rem;
  font-weight: bold;
}

.verified {
  background: rgb(128, 240, 137);
  cursor: pointer;
}

.warning {
  background: rgb(240, 191, 128);
}

.failed {
  background: rgb(233, 95, 95);
}

.hash,
ol > li {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: auto;
}

ol > li {
  list-style-type: none;
  margin-left: -2.2rem;
}

h4 {
  font-size: calc(0.5vw + 0.7vh + 1vmin);
  margin-bottom: 0.7rem;
  margin-top: 0.7rem;
  color: #394f7c;
}

.active-offer {
  background-color: #bae5fa !important;
}

.verify-button {
  margin: 1rem 0rem;
  float: right;
}
</style>
