<template>
  <v-btn color="greenMoodBoard3" small @click="createRoomChat"> Chat</v-btn>
</template>

<script>
import { CreateChatRoom } from "@/Apis/HealthyFormWebApi/ChatApi";
import { mapState } from "vuex";

export default {
  name: "ChatButton",
  data() {
    return {};
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
  },
  methods: {
    async createRoomChat() {
      try {
        const targetUserId = this.$route.params.userId;

        const response = await CreateChatRoom(targetUserId);
        console.log(response);

        await this.$router.push({ name: "Chat" });
      } catch (e) {
        if (e.response.status === 401) {
          alert("Please login!!");
        }
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
