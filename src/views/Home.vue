<template>
  <v-app>
    <!-- Top Nav   -->
    <TopNav v-if="isShowTab" />

    <!--  Body  -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TopNav from "@/views/Layout/TopNav";
import { CometChat } from "@cometchat-pro/chat";

export default {
  name: "Home",
  components: {
    TopNav,
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated", "isAuthenticated"]),
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
    handleInitCometChat: {
      handler() {
        this.initCometChat();
      },
      immediate: true,
    },
    // If current route change then callback fetch detail post
    $route(to, from) {
      // Hide tab navigation on video call component
      this.checkTheCurrentComponent("CometVideoCall", false);
    },
  },
  data() {
    return {
      isShowTab: true,
    };
  },
  methods: {
    ...mapActions("AUTH", ["fetchUserAuthInfo"]),

    initCometChat() {
      const appID = process.env.VUE_APP_COMMETCHAT_APP_ID;
      const region = process.env.VUE_APP_COMMETCHAT_REGION;
      const appSetting = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion(region)
        .build();

      CometChat.init(appID, appSetting).then(
        () => {
          console.log("Initialization completed successfully");
          // You can now call login function.
          // if (this.isAuthenticated === true) {
          //   this.loginCometChat();
          // }
        },
        (error) => {
          console.log("Initialization failed with error:", error);
          // Check the reason for error and take appropriate action.
        }
      );
    },

    loginCometChat() {
      const authKey = process.env.VUE_APP_COMETCHAT_API_KEY;
      const uid = this.userAuthenticated.id;

      CometChat.login(uid, authKey).then(
        (user) => {
          console.log("Login Successful:", { user });
        },
        (error) => {
          console.log("Login failed with exception:", { error });
        }
      );
    },

    checkTheCurrentComponent(componentName, showTabStatus) {
      if (this.$route.name === componentName) {
        this.isShowTab = showTabStatus;
      }
    },
  },
};
</script>
