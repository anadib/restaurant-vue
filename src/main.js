import Vue from "vue";
import Vuex from "vuex";
import VueMask from "v-mask";
import router from "./router";

import "es6-promise/auto";
import { store } from "./store/store";

import App from "./App.vue";

import "./assets/css/global.less";

Vue.use(Vuex);
Vue.use(VueMask);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
