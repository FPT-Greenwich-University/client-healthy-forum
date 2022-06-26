<template>
  <div>
    <v-btn v-if="isGoogleAccount" block plain text @click="logoutGoogle"
      >Logout</v-btn
    >
    <v-btn v-else block plain text @click="logoutBackend">Logout</v-btn>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { Logout } from "@/Apis/HealthyFormWebApi";

export default {
  name: "Logout",
  computed: {
    ...mapGetters("AUTH", ["isGoogleAccount"]),
  },
  methods: {
    ...mapMutations("AUTH", ["logout"]),

    async logoutGoogle() {
      try {
        const response = await this.$gAuth.signOut();
        console.log("result logout", response);
        await this.logoutBackend();
      } catch (e) {
        console.log(e);
      }
    },

    async logoutBackend() {
      try {
        const res = await Logout();
        // console.log("res backend", res);
        localStorage.removeItem("token");
        this.logout(); // call store
        await this.$router.push({ name: "Login" });
      } catch (e) {
        console.log("Backend logout error", e);
      }
    },
  },
};
</script>
