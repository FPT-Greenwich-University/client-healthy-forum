<template>
  <CometChatUI />
</template>

<script>
import { CometChatUI } from "@/cometchat-pro-vue-ui-kit/CometChatWorkspace/src";
import { CometChat } from "@cometchat-pro/chat";
import { mapState } from "vuex";

export default {
  name: "VideoCallScreen",
  components: {
    CometChatUI,
  },

  created() {
    this.registerUser();

    this.loginUser();
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
  },
  methods: {
    registerUser() {
      let authKey = process.env.VUE_APP_COMETCHAT_AUTH_KEY;
      const uid = `customer${this.userAuthenticated.id}`;
      const name = this.userAuthenticated.name;

      const user = new CometChat.User(uid);
      user.setName(name);
      CometChat.createUser(user, authKey).then(
        (user) => {
          console.log("user created", user);
        },
        (error) => {
          console.log("error", error);
        }
      );
    },

    loginUser() {
      let authKey = process.env.VUE_APP_COMETCHAT_AUTH_KEY;
      const uid = `customer${this.userAuthenticated.id}`;

      CometChat.login(uid, authKey).then(
        (user) => {
          console.log("Login Successful:", { user });
        },
        (error) => {
          console.log("Login failed with exception:", { error });
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
