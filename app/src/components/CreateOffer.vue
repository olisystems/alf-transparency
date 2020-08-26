<template>
  <div class="container">
    <div class="title">CREATE OFFER</div>
    <div class="form">
      <form @submit.prevent="submitFile">
        <!-- input username -->
        <label>
          Username:
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter username"
            required
          />
        </label>
        <!-- input date -->
        <label>
          Date:
          <input
            type="text"
            id="date"
            v-model="date"
            placeholder="Enter offer date"
            required
          />
        </label>
        <!-- input file -->
        <label>
          File:
          <input
            type="file"
            id="file"
            ref="file"
            @change="handleFileUpload"
            required
          />
        </label>
        <button class="button" type="submit">Upload</button>
      </form>
    </div>

    <!-- display success message -->
    <div v-if="isUploaded" class="success">
      <div class="message">
        <button @click="close" type="button" class="close-btn">
          <span aria-hidden="true">&#10005;</span>
        </button>
        <strong>Success!</strong>
        <br />
        The file
        <i>
          <b>{{ name }}</b>
        </i>
        is successfully saved to local storage!
        <br />
        {{ dbResponse.code }}, {{ dbResponse.status }}
      </div>
    </div>

    <!-- display error message -->
    <div v-else-if="isFailed" class="error">
      <div class="message">
        <button @click="close" type="button" class="close-btn">
          <span aria-hidden="true">&#10005;</span>
        </button>
        <strong>Error!</strong>
        <br />
        Failed to upload file
        <i>
          <b>{{ name }}</b>
        </i>
        .
      </div>
    </div>
  </div>
</template>

<script>
const SHA256 = require('crypto-js/sha256')
const axios = require('axios')

export default {
  name: 'CreateOffer',

  data() {
    return {
      date: '',
      file: '',
      hash: '',
      name: '',
      dbResponse: '',
      username: '',
      isUploaded: '',
      isFailed: '',
      style: 'hidden',
    }
  },

  methods: {
    handleFileUpload() {
      let file = this.$refs.file.files[0]
      // extract file name
      this.name = file.name
      // hide the message to avoid having
      // unloaded file name
      this.isUploaded = false
      // check validity of CSV file
      if (!file || file.type !== 'text/csv') {
        this.isUploaded = false
        this.isFailed = true
        this.reset()
      }

      // invoke FileReader constructor
      const reader = new FileReader()
      // read file
      reader.readAsText(file, 'UTF-8')

      // attach handler for load event
      reader.onload = (evt) => {
        // save the raw contents
        this.file = evt.target.result
        // create hash
        this.hash = SHA256(this.file).toString()
      }

      // attach handler for error event
      reader.onerror = (evt) => {
        alert('Failed to read file!\n\n' + reader.error)
        reader.abort()
      }
    },

    saveOffer() {
      let key = this.username + '|' + this.date
      let offer = {
        username: this.username,
        date: this.date,
        text: this.file,
        hash: this.hash,
      }
      this.postOffer(offer)
      offer = JSON.stringify(offer)

      window.localStorage.setItem(key, offer)
    },

    postOffer(offer) {
      let url = 'http://127.0.0.1:3001/api/offers/'
      axios
        .post(url, offer)
        .then((response) => {
          this.dbResponse = {
            code: response.status,
            status: response.statusText,
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    submitFile() {
      this.isFailed = false
      this.isUploaded = true
      this.saveOffer()
      this.reset()
    },

    reset() {
      this.hash = ''
      this.date = ''
      this.username = ''
      this.$refs.file.value = null
    },

    close() {
      this.isUploaded = false
      this.isFailed = false
    },
  },
}
</script>

<style>
.container {
  margin: auto;
  width: 40%;
  margin-top: 4rem;
  text-align: left;
}

.title {
  font-weight: bold;
  font-size: 1.7rem;
  line-height: 1.25;
  letter-spacing: -0.025em;
  text-align: center;
}

.form {
  margin: auto;
  margin-top: 2rem;
  border: 0.5px solid #bebebe;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.36);
  padding: 5% 4%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

input {
  width: 100%;
  padding: 0.7rem;
  margin: 1rem auto;
  border-radius: 1px;
  box-sizing: border-box;
  border: 1px solid #abaeaf;
}

.button {
  float: right;
  outline: none;
  color: #fff;
  cursor: pointer;
  padding: 0.6rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  border-radius: 2px;
  border: 1px solid transparent;
  background-color: #0080c2;
  transition-duration: 0.4s;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
}

.button:hover {
  background-color: #2f62c0;
  border: 1px solid #2f62c0;
}

/* style notification */
.success {
  background: #ddffdd;
}

.error {
  background: #f0bcbc;
}

.not-found{
  background: #ffddab;
}

.message {
  margin: 1rem;
  padding: 0.7rem 0;
}

.close-btn {
  border: none;
  float: right;
  cursor: pointer;
  padding: 0.5rem;
  outline: none;
  background-color: transparent;
}
</style>
