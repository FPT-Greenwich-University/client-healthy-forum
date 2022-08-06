import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        bananaGreen: "#224c3c",
        bananaGrey: "#e5e4e3",
        bananaYellow: "#e4c7a6",
        bananaLightGreen: "#97A396",
        bananaBrown: "#927352",
      },
    },
  },
});
