<template>
  <Home />
</template>

<script>
import Home from "@/views/Home";
import { CometChat } from "@cometchat-pro/chat";

export default {
  name: "App",
  components: {
    Home,
  },
  created() {
    this.initializeCometChat();
  },
  methods: {
    initializeCometChat() {
      const appID = process.env.VUE_APP_COMETCHAT_APP_ID;
      const region = process.env.VUE_APP_COMETCHAT_REGION;
      const appSetting = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion(region)
        .build();

      CometChat.init(appID, appSetting).then(
        () => {
          console.log("Initialization completed successfully");
          // You can now call login function.
        },
        (error) => {
          console.log("Initialization failed with error:", error);
          // Check the reason for error and take appropriate action.
        }
      );
    },
  },
};
</script>
