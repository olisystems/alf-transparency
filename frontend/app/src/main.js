import "v-tooltip/dist/v-tooltip.css";

import App from "./App.vue";
import SmartTable from "vuejs-smart-table";
import VTooltip from "v-tooltip";
import Vue from "vue";

Vue.use(SmartTable);
Vue.config.productionTip = false;
Vue.use(VTooltip);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
