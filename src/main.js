import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

import GAuth from "vue-google-oauth2";
const gauthOption = {
  clientId:
      "267568785906-l2o0brkumgs5atlbc68dbamcf6v60csk.apps.googleusercontent.com",

  scope: "profile email",
  prompt: "consent",
  fetch_basic_profile: true,
};

Vue.use(GAuth, gauthOption);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
