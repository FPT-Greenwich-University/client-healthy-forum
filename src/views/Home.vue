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
import { mapActions, mapGetters, mapState } from "vuex";
import TopNav from "@/views/Layout/TopNav";
import { CometChat } from "@cometchat-pro/chat";

export default {
  name: "Home",
  components: {
    TopNav,
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated", "isAuthenticated"]),
    ...mapGetters("AUTH", ["isGoogleAccount"]),
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
        // if the user is authenticated
        if (this.isAuthenticated) {
          this.initCometChat();

          // Register account for Google's user
          if (this.isGoogleAccount === true) {
            const userInfo = {
              userId: this.userAuthenticated.id,
              name: this.userAuthenticated.name,
            };
            this.registerCometChatGoogleAccount(userInfo);
          }
        }
      },
      immediate: true,
    },

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

    // Init connection to comet chat server
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
        },
        (error) => {
          console.log("Initialization failed with error:", error);
          // Check the reason for error and take appropriate action.
        }
      );
    },

    // Check the current component which is wanted to set status of tab navigation
    checkTheCurrentComponent(componentName, showTabStatus) {
      if (this.$route.name === componentName) {
        this.isShowTab = showTabStatus;
      }
    },

    registerCometChatGoogleAccount(userInfo) {
      const authKey = process.env.VUE_APP_COMETCHAT_API_KEY;
      const uid = userInfo.userId.toString();
      const name = userInfo.name.toString();

      const user = new CometChat.User(uid);
      user.setName(name);
      CometChat.createUser(user, authKey).then(
        (user) => {
          console.log("google account user created", user);
        },
        (error) => {
          console.log("error", error);
        }
      );
    },
  },
};
</script>
