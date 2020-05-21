<template>
  <div class="main"></div>
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
      console.log(res+Date.now());
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
<style scoped></style>
