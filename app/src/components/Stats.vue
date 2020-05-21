<template>
  <div class="stats">
    <div class="bar">
      <div>
        <p>Contract Owner</p>
        <h4 class="address" v-tooltip="owner">{{ owner }}</h4>
      </div>
      <div>
        <p>Contract Created</p>
        <img
          src="../assets/img/loader.svg"
          alt="spinner by loading.io"
          class="time-loader"
        />
        <h4>{{ creationTime }}</h4>
      </div>
      <div>
        <p>Network</p>
        <h4>Volta</h4>
      </div>
      <div>
        <p>Current Block</p>
        <img
          src="../assets/img/loader.svg"
          alt="spinner by loading.io"
          class="block-loader"
        />
        <h4>{{ currentBlock }}</h4>
      </div>

      <div>
        <p>Gas Price [Gwei]</p>
        <h4>18</h4>
      </div>

      <div>
        <p>Last Miner</p>
        <img
          src="../assets/img/loader.svg"
          alt="spinner by loading.io"
          class="miner-loader"
        />
        <h4 class="address" v-tooltip="miner">{{ miner }}</h4>
      </div>
    </div>
  </div>
</template>
<script>
const $ = require("jquery");
import web3 from "@/assets/js/web3";
import alfTransparencyContract from "@/assets/js/contractInstance";
export default {
  name: "Stats",
  data() {
    return {
      contract: "",
      owner: "",
      creationTime: "",
      currentBlock: "",
      miner: "",
      transactions: "",
      gas: "",
    };
  },
  methods: {
    async getOwner() {
      this.owner = await this.contract.methods.owner().call();
    },

    async getContractCreationTime() {
      this.creationTime = await this.contract.methods.creationTime().call();
      $(".time-loader").hide();
    },

    getLatestBlockNumber() {
      setInterval(async () => {
        this.currentBlock = await web3.eth.getBlockNumber();
        $(".block-loader").hide();
      }, 5000);
    },

    getMiner() {
      setInterval(async () => {
        let block = await web3.eth.getBlock("latest");
        this.miner = block.miner;
        $(".miner-loader").hide();
      }, 5000);
    },

    callFunc() {
      this.getOwner();
      this.getContractCreationTime();
    },
  },

  async created() {
    this.contract = await alfTransparencyContract();
    this.getLatestBlockNumber();
    this.getMiner();
    this.callFunc();
  },
};
</script>
<style scoped>
.stats {
  background-color: rgb(241, 237, 237);
}

.bar {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}

.bar > div {
  margin: 0.1rem;
  flex: 1 0 0px;
  padding: 0.5rem;
  overflow: hidden;
}

img {
  width: 2rem;
  height: 2rem;
}

h4 {
  font-size: calc(0.6vw + 0.6vh + 0.6vmin);
  margin-bottom: 0.7rem 0;
  /* color: #f6851b; */
  color: #152128;
}

.address {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

p {
  font-size: calc(0.5vw + 0.5vh + 0.5vmin);
}
</style>
