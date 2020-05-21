<template>
  <div class="main">
    <div class="container">
      <form @submit.prevent="sendHash" class="search-bar">
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

      <p>These are the hashes currently stored on Volta.</p>
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

    async queryDatabase() {
      let res = await getData();
      //console.log(res + Date.now());
    },

    async sendHash() {
      let res = await getData();
      let time = Date.now();
      let doc = res + time;

      this.contract.methods
        .sendHash(doc, this.hashType, time)
        .send({ from: this.account }, function (error, transactionHash) {
          console.log(transactionHash);
        });
      this.hashType = "";
    },
  },

  async created() {
    this.getMetamaskAccount();
    this.contract = await alfTransparencyContract();
    this.queryDatabase();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  margin: 3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container {
  width: 60%;
  background: #fff;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

select {
  border: 0;
  width: 100%;
  padding: 1rem;
  font-size: 1em;
  color: white;
  background-color: #5f6363;
}

.search-bar > button {
  border: 0;
  padding: 1rem;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  text-transform: uppercase;
  color: white;
  background-color: #323333;
}
</style>
