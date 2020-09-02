<template>
  <div class="container">
    <div class="title">SEND ROOT HASH</div>

    <div class="form">
      <form @submit.prevent="sendRootHash">
        <!-- select username -->

        <label>
          <!-- Date: -->
          <input type="date" id="date" v-model="date" placeholder="dd-mm-yyyy" required />
        </label>

        <button class="button" type="submit">Send Hash</button>
      </form>
    </div>

    <!-- display success message -->

    <img src="../assets/img/loader.svg" alt="spinner by loading.io" class="loader" />

    <div v-if="success" class="success">
      <div class="message">
        <button @click="reset" type="button" class="close-btn">
          <span aria-hidden="true">&#10005;</span>
        </button>
        <strong>Success!</strong>
        <br />
        <br />Transaction Hash is:
        <br />
        <br />
        <i>
          <div v-tooltip="response" class="hash">{{ response }}</div>
        </i>
      </div>
    </div>

    <!-- display error message -->
    <div v-else-if="failure" class="warning">
      <div class="message">
        <button @click="reset" type="button" class="close-btn">
          <span aria-hidden="true">&#10005;</span>
        </button>
        <strong>Error!</strong>
        <br />
        <br />
        <i>
          <b>{{ response }}</b>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
const $ = require("jquery");
const axios = require("axios");
import web3 from "@/assets/js/web3";
import Contract from "@/assets/js/contractInstance";

export default {
  name: "Admin",
  data() {
    return {
      contract: "",
      response: "",
      success: "",
      failure: "",
      date: "",
    };
  },
  methods: {
    // get eth address for given cpId
    async getRootHash(timestamp) {
      let root = await this.contract.methods.getHash(timestamp).call();
      return root;
    },

    async sendRootHash() {
      $(".loader").show();
      this.reset();
      let url = "http://127.0.0.1:3001/api/offers/rootHashTrigger";
      axios
        .get(url, {
          params: {
            date: this.date,
          },
        })
        .then((res) => {
          if ("message" in res.data) {
            this.failure = true;
            this.response = res.data.message;
          } else {
            this.success = true;
            this.response = res.data.transactionHash;
          }
          $(".loader").hide();
        })
        .catch((error) => {
          console.log(error);
        });

      this.date = "";
    },

    reset() {
      this.response = "";
      this.failure = "";
      this.success = "";
    },
  },
  async created() {
    this.contract = await Contract();
  },
};
</script>

<style>
select {
  margin: auto;
  padding: 1rem;
  width: 100%;
  align-items: center;
  font-size: 1em;
  margin-bottom: 2rem;
}

img {
  display: none;
  margin: auto;
  margin-top: 1rem;
  width: 5rem;
  height: 5rem;
}
</style>
