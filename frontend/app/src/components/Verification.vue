<template>
  <div class="container">
    <div class="title">VERIFY OFFER</div>

    <div class="form">
      <form @submit.prevent="verify">
        <!-- select username -->

        <select v-model.trim="selected" required>
          <option disabled value="">Please select one</option>
          <option v-for="(user, index) in users" :key="index">
            {{ user }}
          </option>
        </select>

        <button class="button" type="submit">Verify</button>
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
export default {
  name: 'Verification',
  data() {
    return {
      users: [],
      selected: '',
      response: '',
      notFound: '',
      success: '',
      failure: '',
    }
  },
  methods: {
    getOffers() {
      this.users = Object.keys(window.localStorage)
    },

    verify() {
      let url = 'http://127.0.0.1:3001/api/offers/proof'
      // retrieve username and date from selected key
      const tree = new MerkleTree([], SHA256)
      const localRoot = tree.getRoot().toString('hex')
      let user = this.selected.split('|')
      let localLeaf = localStorage.getItem(this.selected)
      let l = JSON.parse(localLeaf).hash
      let username = user[0]
      let date = user[1]
      axios
        .get(url, {
          params: {
            username: username,
            date: date,
          },
        })
        .then((res) => {
          if ('message' in res.data) {
            this.notFound = true
            this.success = false
            this.failure = false
            this.response = username
          } else {
            //let proof = res.data.pf
            const proof = res.data.pf.map((object) => {
              object.data = Buffer.from(object.data.data)
              return object
            })
            let root = res.data.r
            const result = tree.verify(proof, l, root)

            if (result) {
              this.success = true
              this.notFound = false
              this.failure = false
              this.response = username
            } else {
              this.failure = true
              this.success = false
              this.notFound = false

              this.response = username
            }
          }
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
  created() {
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
