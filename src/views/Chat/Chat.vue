<template>
  <v-container>
    <v-row justify="space-between">
      <!-- List of chat rooms -->
      <v-col class="col-3">
        <ChatRooms :chat-rooms="chatRooms" @select-room="fetchMessages" />
      </v-col>

      <v-col class="col-9">
        <!-- List of messages -->
        <ChatMessages :messages="messages" />
        <v-divider class="ma-10"></v-divider>
        <!-- Form input -->
        <ChatForm @message-sent="addMessage" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";
import ChatForm from "@/components/Chat/ChatForm";
import ChatMessages from "@/components/Chat/ChatMessages";
import ChatRooms from "@/components/Chat/ChatRooms";
import { mapState } from "vuex";
import {
  FetchMessages,
  FetchChatRooms,
  SendMessage,
} from "@/Apis/HealthyFormWebApi/ChatApi";

export default {
  name: "Chat",
  components: { ChatRooms, ChatMessages, ChatForm },
  mounted() {
    this.fetchChatRooms();

    Echo.private("chat").listen("MessageSent", (e) => {
      console.log("Broadcast", e);
      // Only target user update a message from broadcast
      if (e.user.id !== this.userAuthenticated.id) {
        this.messages.push({
          message: e.message.message,
          user: e.user,
        });
      }
    });
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
    ...mapState("CHATS", ["targetUserId", "chatRoomId"]),
  },
  data() {
    return {
      messages: [],
      chatRooms: [],
    };
  },

  methods: {
    async fetchChatRooms() {
      try {
        const response = await FetchChatRooms();

        this.chatRooms = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async fetchMessages() {
      try {
        const response = await FetchMessages(
          this.chatRoomId,
          this.targetUserId
        );

        this.messages = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async addMessage(message) {
      //Pushes it to the messages array
      this.messages.push(message);

      try {
        let formData = {
          message: message.message,
          targetId: this.targetUserId,
          chatRoomId: this.chatRoomId,
        };

        await SendMessage(formData);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
