<template>
  <div class="container">
    <div class="title">Create Offer</div>
    <div class="form">
      <form @submit.prevent="submitFile">
        <label>
          Username:
          <input type="text" id="username" v-model="username" required />
        </label>

        <label>
          Date:
          <input type="text" id="date" v-model="date" required />
        </label>

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
        <button type="submit">Upload</button>
      </form>
    </div>
  </div>
</template>

<script>
import SHA256 from 'crypto-js/sha256'

export default {
  name: 'CreateOffer',
  data() {
    return {
      username: '',
      date: '',
      file: '',
      hash: '',
      isUploaded: '',
      isFailed: '',
    }
  },
  methods: {
    handleFileUpload() {
      let file = this.$refs.file.files[0]

      // check validity of CSV file
      if (!file || file.type !== 'text/csv') return

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
        this.isFailed = true
        reader.abort()
      }
    },

    submitFile() {
      this.isUploaded = true
      console.log(this.hash);
      this.reset()
    },

    reset() {
      this.hash = ''
      this.date = ''
      this.username = ''
      this.$refs.file.value = null
    },
  },
}
</script>

<style>
.container {
  text-align: left;
  max-width: 500px;
  margin: auto;
  margin-top: 4rem;
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

button {
  float: right;
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

button:hover {
  background-color: #2f62c0;
  border: 1px solid #2f62c0;
}
</style>
