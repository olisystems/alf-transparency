import 'v-tooltip/dist/v-tooltip.css'

import App from './App.vue'
import SmartTable from 'vuejs-smart-table'
import VTooltip from 'v-tooltip'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

import './assets/css/navbar.css'
import 'v-tooltip/dist/v-tooltip.css'

Vue.use(SmartTable)
Vue.config.productionTip = false
Vue.use(VTooltip)
Vue.use(VueRouter)

const router = new VueRouter({ mode: 'history', routes })
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
