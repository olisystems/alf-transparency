<template>
  <div class="container">
    <div class="title">OFFERS</div>
    <select v-model.trim="selected" required @change="currentOffer">
      <option disabled value="">Select a user</option>
      <option v-for="(user, index) in users" :key="index">
        {{ user }}
      </option>
    </select>

    <!-- display offer list for selected user -->
    <div>
      <!-- show offers for selected user -->
      <div v-if="offers.length > 0">
        <ul class="offer-list">
          <li class="list-title">Username | Date</li>
          <li v-for="(offer, index) in offers" :key="index">
            <!-- display all offers for a selected user -->
            <div v-if="offer.date.length > 0" class="sub-list">
              <li
                v-for="(item, index) in offer.date"
                :key="index"
                @click="showOffer"
              >
                {{ offer.username }} | {{ item }}
              </li>
            </div>
            <!-- display when user has only one offer -->
            <div v-else>{{ offer.username }} | {{ offer.date }}</div>
          </li>
        </ul>
      </div>
      <!-- show place mark when no user is selected -->
      <div v-else>Select a user to see offer list</div>
    </div>

    <div v-if="csv.length > 0" class="contents">
      <div class="hash" v-tooltip="hash">
        <div class="content-header">
          <h4>Hash</h4>
          <span>{{ status }}</span>
        </div>

        {{ hash }}
      </div>

      <div class="csv">
        <h4>CSV</h4>
        <ol>
          <li v-for="(data, index) in csv" :key="index">
            {{ data }}
          </li>
        </ol>
      </div>

      <div class="verify-button">
        <button type="submit" class="button">Verify</button>
      </div>
    </div>
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
      users: [],
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
      this.key = infoArr[0].trim() + '|' + infoArr[1].trim()
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 1.2rem;
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
