<template>
  <v-app>
    <!-- Top Nav   -->
    <TopNav />

    <!--  Body  -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import TopNav from "@/views/Layout/TopNav";

export default {
  name: "Home",
  components: {
    TopNav,
  },
  watch: {
    getUserInfo: {
      handler() {
        if (localStorage.getItem("token")) {
          this.fetchUserAuthInfo();
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions("AUTH", ["fetchUserAuthInfo"]),
  },
};
</script>