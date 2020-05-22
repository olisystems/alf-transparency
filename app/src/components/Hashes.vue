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

      <ul>
        <li v-for="(data, index) in hahses" v-bind:key="index">
          {{ data.hash }} | {{ data.docType }} | {{ data.timestamp }}
        </li>
      </ul>
      <p>These are the hashes currently stored on Volta.</p>
    </div>

    <div class="container"></div>
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
      hahses: [],
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
          this.hahses.unshift({
            hash: event.returnValues.docHash,
            docType: event.returnValues.docType,
            timestamp: event.returnValues.timestamp,
          });
          console.log(this.hahses);
        })
        .on("error", console.error);
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

ul {
  margin: 0;
  padding: 0;
  height: 200px;
  overflow-y: auto;
  list-style-type: none;
  text-align: left;
}

ul li {
  padding: 1.3rem;
  font-size: 1.1em;
  background-color: rgb(241, 237, 237);
  border-left: 5px solid #5f6363;
  margin-bottom: 2px;
  color: #3e5252;
}
</style>
