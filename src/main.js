import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import GAuth from "vue-google-oauth2";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";

Vue.config.productionTip = false;

const gauthOption = {
  clientId:
    "267568785906-l2o0brkumgs5atlbc68dbamcf6v60csk.apps.googleusercontent.com",

  scope: "profile email",
  prompt: "consent",
  fetch_basic_profile: true,
};

Vue.use(GAuth, gauthOption);

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: process.env.VUE_APP_WEBSOCKET_KEY,
  wsHost: process.env.VUE_APP_WEBSOCKET_SERVE,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  encrypted: true,
  authorizer: (channel, options) => {
    console.log(options);
    return {
      authorize: (socketId, callback) => {
        HealthyFormWebApi()
          .post(`http://localhost:8000/api/broadcasting/auth`, {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
