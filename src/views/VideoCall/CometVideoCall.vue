<template>
  <CometChatUI />
</template>

<script>
import CometChatUI from "@/cometchat-pro-vue-ui-kit/CometChatWorkspace/src/components/CometChatUI/CometChatUI";
import { CometChat } from "@cometchat-pro/chat";
import { mapState } from "vuex";

export default {
  name: "CometVideoCall",
  components: { CometChatUI },
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
  },
  created() {
    this.loginCometChat();
  },
  methods: {
    loginCometChat() {
      if (this.userAuthenticated.id) {
        const authKey = process.env.VUE_APP_COMETCHAT_API_KEY;
        const uid = this.userAuthenticated.id.toString();

        CometChat.login(uid, authKey).then(
          (user) => {
            console.log("Login Successful:", { user });
          },
          (error) => {
            console.log("Login failed with exception:", { error });
          }
        );
      }
    },
  },
};
</script>

<style scoped></style>
