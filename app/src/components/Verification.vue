<template>
  <div class="container">
    <div class="title">VERIFY OFFER</div>

    <!-- <div class="form">
      <form @submit.prevent="verify">
        

        <select v-model.trim="selected" required>
          <option disabled value="">Please select one</option>
          <option v-for="(user, index) in users" :key="index">
            {{ user }}
          </option>
        </select>

        <button class="button" type="submit">Verify</button>
      </form>
    </div> -->

    <div class="form">
      <form @submit.prevent="sendRootHash">
        <!-- select username -->

        <label>
          <!-- Date: -->
          <input
            type="date"
            id="date"
            v-model="date"
            placeholder="dd-mm-yyyy"
            required
          />
        </label>

        <button class="button" type="submit">Send Hash</button>
      </form>
    </div>

    <!-- display success message -->
    <div v-if="success" class="success">
      <div class="message">
        <button @click="close" type="button" class="close-btn">
          <span aria-hidden="true">&#10005;</span>
        </button>
        <strong>Success!</strong>
        <br />
        Successfully verified the offer for user:
        <i>
          <b>{{ response }}</b>
        </i>
      </div>
    </div>

    <!-- display error message -->
    <div v-else-if="failure" class="error">
      <div class="message">
        <button @click="close" type="button" class="close-btn">
          <span aria-hidden="true">&#10005;</span>
        </button>
        <strong>Error!</strong>
        <br />
        Failed to verify the offer for the user:
        <i>
          <b>{{ response }}</b>
        </i>
        .
      </div>
    </div>

    <!-- display error message -->
    <div v-else-if="notFound" class="not-found">
      <div class="message">
        <button @click="close" type="button" class="close-btn">
          <span aria-hidden="true">&#10005;</span>
        </button>
        <strong>NotFound!</strong>
        <br />
        No offer found for user:
        <i>
          <b>{{ response }}</b>
        </i>
        .
      </div>
    </div>
  </div>
</template>

<script>
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const axios = require('axios')
import web3 from '@/assets/js/web3'
import Contract from '@/assets/js/contractInstance'

export default {
  name: 'Verification',
  data() {
    return {
      contract: '',
      users: [],
      selected: '',
      response: '',
      notFound: '',
      success: '',
      failure: '',
      date: '',
    }
  },
  methods: {
    getOffers() {
      this.users = Object.keys(window.localStorage)
    },

    // get eth address for given cpId
    async getRootHash(timestamp) {
      let root = await this.contract.methods.getHash(timestamp).call()
      return root
    },

    async sendRootHash() {
      let url = 'http://127.0.0.1:3001/api/offers/rootHashTrigger'
      axios
        .get(url, {
          params: {
            date: this.date,
          },
        })
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async verify() {
      let url = 'http://127.0.0.1:3001/api/offers/proof'
      // retrieve username and date from selected key
      let user = this.selected.split('|')
      let localLeaf = localStorage.getItem(this.selected)
      let leaf = JSON.parse(localLeaf).hash
      let username = user[0]
      let date = user[1]
      console.log(date)
      const tree = new MerkleTree([], SHA256)
      const root = this.getRootHash(date)
      axios
        .get(url, {
          params: {
            username: username,
            date: date,
          },
        })
        .then((res) => {
          console.log(res)
          // if ('message' in res.data) {
          //   this.notFound = true
          //   this.success = false
          //   this.failure = false
          //   this.response = username
          // } else {
          //   //let proof = res.data.pf
          //   const proof = res.data.map((object) => {
          //     object.data = Buffer.from(object.data.data)
          //     return object
          //   })
          //   const result = tree.verify(proof, leaf, root)

          //   if (result) {
          //     this.success = true
          //     this.notFound = false
          //     this.failure = false
          //     this.response = username
          //   } else {
          //     this.failure = true
          //     this.success = false
          //     this.notFound = false

          //     this.response = username
          //   }
          // }
        })
        .catch((error) => {
          console.log(error)
        })

      // clear selected
      this.selected = ''
    },

    close() {
      this.notFound = false
      this.failure = false
      this.success = false
    },
  },
  async created() {
    this.contract = await Contract()
    this.getOffers()
  },
}
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
</style>
