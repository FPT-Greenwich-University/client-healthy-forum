import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import GAuth from "vue-google-oauth2";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import HealthySocialWebApi from "@/Apis/HealthyFormWebApi/HealthySocialWebApi";
import Vue2Editor from "vue2-editor";

Vue.config.productionTip = false;

const gauthOption = {
  clientId:
    "267568785906-l2o0brkumgs5atlbc68dbamcf6v60csk.apps.googleusercontent.com",

  scope: "profile email",
  prompt: "consent",
  fetch_basic_profile: true,
};

Vue.use(GAuth, gauthOption);

// Using vue2 editor
Vue.use(Vue2Editor);

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "s3cr3t",
  wsHost: "localhost",
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        HealthySocialWebApi()
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
