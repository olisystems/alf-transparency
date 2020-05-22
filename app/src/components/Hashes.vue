<template>
  <div class="main">
    <div class="container">
      <form @submit.prevent="sendHash" class="send-hash">
        <select v-model="hashType" required>
          <option disabled value>Please select one</option>
          <option>Supply Hash</option>
          <option>Demand Hash</option>
          <option>Effectivity Matrix</option>
          <option>Request Hash</option>
          <option>Delivery Hash</option>
        </select>

        <button type="submit">Send</button>
      </form>

      <transition-group name="list" tag="ul" class="hash-list">
        <li v-for="data in hashesHistory" v-bind:key="data.timestamp">
          {{ data.hash }} | {{ data.docType }} | {{ data.timestamp }}
        </li>
      </transition-group>
      <!-- <p>These are the hashes currently stored on Volta.</p> -->
    </div>

    <div class="history">
      <div class="docType-list" v-if="hashes.length > 0">
        <div class="header">
          <h4>Document Type</h4>
        </div>
        <ul class="doc-type">
          <li
            v-on:click="getHashHistory"
            v-for="(data, index) in hashes"
            v-bind:key="index"
          >
            {{ data.docType }}
          </li>
        </ul>
      </div>
      <div v-else>
        <h4 class="not-found">No document hash is saved...</h4>
      </div>

      <div class="docType-history">
        <div class="header">
          <h4>
            Showing Hashes for
            <span>
              {{ docType }}
            </span>
          </h4>
        </div>
        <div class="table">
          <div class="table-wrapper" v-if="currentHashType.length > 0">
            <v-table :data="currentHashType">
              <thead slot="head">
                <th>Hash</th>
                <th class="time-column">Time</th>
              </thead>

              <transition-group
                name="list"
                tag="tbody"
                slot="body"
                slot-scope="{ displayData }"
              >
                <tr v-for="(row, index) in displayData" :key="index">
                  <td>{{ row.hash }}</td>
                  <td>{{ row.timestamp }}</td>
                </tr>
              </transition-group>
            </v-table>
          </div>
          <div v-else>
            <h4 class="not-found">Select a document hash to view details...</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import web3 from "@/assets/js/web3";
import alfTransparencyContract from "@/assets/js/contractInstance";
import getData from "@/assets/js/server";
import axios from "axios";
export default {
  name: "Hashes",

  data() {
    return {
      account: "",
      contract: "",
      hashType: "",
      hashesHistory: [],
      hashes: [],
      currentHashType: [],
      docType: "",
    };
  },

  methods: {
    getMetamaskAccount() {
      web3.eth.getAccounts((err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        this.account = res[0];
      });
    },

    async sendHash() {
      let res = await getData();
      let time = Date.now();
      let doc = res + time;

      doc = web3.utils.sha3(doc);

      this.contract.methods
        .sendHash(doc, this.hashType, time)
        .send({ from: this.account }, function (error, transactionHash) {
          //console.log(transactionHash);
        });
      this.hashType = "";
    },

    watchHashes() {
      this.contract.events
        .NewHash({
          fromBlock: 0,
          toBlock: "latest",
        })
        .on("data", (event) => {
          this.hashesHistory.unshift({
            hash: event.returnValues.docHash,
            docType: event.returnValues.docType,
            timestamp: event.returnValues.timestamp,
          });

          // build key value pair

          let index = this.hashes.findIndex(
            (record) => record.docType == event.returnValues.docType
          );

          if (index === -1) {
            this.hashes.push({
              docType: event.returnValues.docType,
              hash: [event.returnValues.docHash],
              timestamp: [event.returnValues.timestamp],
            });
          } else {
            this.hashes[index].hash.push(event.returnValues.docHash);
            this.hashes[index].timestamp.push(event.returnValues.timestamp);
          }
        })
        .on("error", console.error);
    },

    getHashHistory() {
      this.docType = event.target.innerHTML.trim();

      this.currentHashType = [];

      this.contract
        .getPastEvents("NewHash", { fromBlock: 0, toBlock: "latest" })

        .then((events) => {
          events.forEach((event) => {
            if (this.docType == event.returnValues.docType) {
              this.currentHashType.unshift({
                hash: event.returnValues.docHash,
                timestamp: event.returnValues.timestamp,
              });
            }
          });
        });

      // removing the background color for ul-selected items
      document.querySelectorAll(".doc-type>li").forEach((list) => {
        list.classList.remove("active-docType");
      });
      // add background to selected account
      event.target.classList.add("active-docType");
    },
  },

  async created() {
    this.getMetamaskAccount();
    this.contract = await alfTransparencyContract();
    this.watchHashes();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  margin: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.container {
  background: rgb(250, 250, 250);
  box-shadow: 0 10px 30px rgba(51, 51, 51, 0.1);
  border-radius: 2px;
}

.send-hash {
  display: flex;
  margin: 0.8rem;
  justify-content: space-around;
}

select {
  border: 0;
  width: 75%;
  padding: 1rem;
  font-size: 1em;
  color: white;
  user-select: none;
  background-color: #5f6363;
  border-radius: 25px;
}

.send-hash > button {
  border: 0;
  width: 15%;
  padding: 1rem;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  text-transform: uppercase;
  color: white;
  background-color: #323333;
  border-radius: 25px;
}

.hash-list {
  margin: 0;
  padding: 0;
  height: 300px;
  overflow-y: auto;
  list-style-type: none;
  text-align: left;
}

.hash-list > li {
  padding: 1.3rem;
  font-size: 1.1em;
  background-color: rgb(241, 237, 237);
  border-left: 5px solid #5f6363;
  margin-bottom: 2px;
  color: #3e5252;
}

.history {
  width: 70%;
  margin: 2rem;
  display: flex;
  justify-content: space-between;
}

.docType-list {
  width: 25%;
}

.docType-history {
  width: 70%;
}

.header,
.doc-type,
.table {
  text-align: left;
  border: 1px solid #dee2e6;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(51, 51, 51, 0.1);
  border-radius: 2px;
}

h4 {
  padding-left: 0.8rem;
}

.doc-type {
  margin: 0;
  padding: 0;
  height: 255px;
  overflow-y: auto;
  list-style-type: none;
  text-align: left;
}

.doc-type > li {
  padding: 1rem;
  font-size: 1.1em;
  margin-bottom: 2px;
  color: #3e5252;
  cursor: pointer;
}

.doc-type > li:after {
  padding: 0.2rem;
  content: "";
  display: block;
  width: 85%;
  border-bottom: 1px solid rgb(206, 204, 204);
}

.doc-type > li:last-child:after {
  border-bottom: none;
}

.doc-type > li:hover {
  background: #e0dede;
}

.active-docType {
  background: #d4d3d3;
}

.table {
  height: 255px;
  overflow-y: auto;
}

.table-wrapper {
  border: 1px solid #dee2e6;
  margin: 0.5rem;
  border-radius: 2px;
}

.table table {
  table-layout: fixed;
  width: 100%;
  padding: 0.5rem;
  text-align: center;
}

tbody {
  height: 100px;
  text-align: left;
  text-align: center;
}

th {
  background: #d4d3d3;
  border: #c0c2c4 1px solid;
  border-radius: 1px;
  font-size: 1rem;
  position: sticky;
  z-index: 5;
  top: 0;
}

td,
th {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.5rem;
  font-size: 0.9rem;
}

td {
  border-bottom: 1px solid #cccccc;
}

.time-column {
  width: 30%;
}

tbody > tr:last-child > td {
  border-bottom: none;
}

.not-found {
  color: #bbb;
}

span {
  color: #914343fd;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease-in-out;
}

.list-enter /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
  background-color: #a7e795;
}

.list-move {
  transition: transform 1s;
}
</style>
