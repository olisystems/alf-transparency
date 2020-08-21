<template>
  <div class="main">
    <div class="title">OFFERS</div>
    <div class="offers">
      <ul class="offer-list">
        <li class="list-title">Username | Date | Hash</li>
        <li
          v-for="(data, index) in offers"
          v-bind:key="index"
          @click="displayCSV"
        >
          {{ data.username }} | {{ data.date }} |
          {{ data.hash }}
        </li>
      </ul>
    </div>

    <!-- display CSV for selected offer -->
    <div class="text" v-if="display">
      <button class="close-btn" @click="clear">
        <span aria-hidden="true">&#10005;</span>
      </button>
      <ol>
        <li v-for="(data, index) in csv" :key="index">
          {{ data }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Offers',
  data() {
    return {
      offers: [],
      key: '',
      csv: [],
      display: '',
    }
  },
  methods: {
    getOffers() {
      let entries = Object.entries(window.localStorage)
      entries.forEach((entry) => {
        // check for webpack dev server entry
        if (entry[0] != 'loglevel:webpack-dev-server') {
          let value = JSON.parse(entry[1])
          let obj = {
            key: entry[0],
            username: value.username,
            date: value.date,
            hash: value.hash,
            text: value.text,
          }
          this.offers.push(obj)
        }
      })
    },

    displayCSV() {
      this.display = true
      // get list item contents
      let info = event.target.innerHTML.trim()
      let infoArr = info.split('|')
      this.key = infoArr[0].trim() + infoArr[1].trim()
      // find & display offer for key
      this.offers.forEach((offer) => {
        if (offer.key === this.key) {
          let rows = offer.text.split('\n')
          this.csv = []
          this.csv.push(...rows)
        }
      })

      // removing the background color for ul-selected items
      document.querySelectorAll('.offer-list > li').forEach((li) => {
        li.classList.remove('active-offer')
      })
      // add background to selected account
      event.target.classList.add('active-offer')
    },

    clear() {
      this.display = false
      // removing the background color for ul-selected items
      document.querySelectorAll('.offer-list > li').forEach((li) => {
        li.classList.remove('active-offer')
      })
    },
  },
  created() {
    this.getOffers()
  },
}
</script>

<style>
.main {
  margin: auto;
  max-width: 60%;
  margin-top: 4rem;
  text-align: left;
}

.offers {
  margin-top: 2rem;
  border-radius: 2px;
  background: rgb(250, 250, 250);
  box-shadow: 0 10px 30px rgba(51, 51, 51, 0.1);
}

.offer-list {
  margin: 0;
  padding: 0;
  height: 400px;
  overflow-y: auto;
  list-style-type: none;
  text-align: left;
}

.offer-list > li {
  padding: 1.3rem;
  font-size: 1.1em;
  background-color: rgb(241, 237, 237);
  border-left: 5px solid rgb(0, 128, 194);
  margin-bottom: 2px;
  color: #3e5252;
  cursor: pointer;
}

.offer-list > .list-title {
  border: none;
  font-weight: bold;
  text-align: center;
}

.text {
  margin-top: 4rem;
  border-radius: 2px;
  border: 1px solid rgb(226, 226, 224);
}

ol > li {
  list-style-type: none;
  padding: 0.3rem;
}

.active-offer {
  background-color: #bae5fa !important;
}
</style>
