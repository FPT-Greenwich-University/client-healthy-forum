<template>
  <v-container>
    <v-row justify="space-between">
      <!-- List of chat rooms -->
      <v-col class="col-3">
        <ChatRooms
          :chat-rooms="chatRooms"
          @notification="playSound"
          @select-room="fetchMessages"
          @retrieve-message="fetchMessages"
        />
      </v-col>

      <v-col v-if="messages.length > 0" class="col-9">
        <!-- List of messages -->
        <ChatMessages :messages="messages" />

        <!-- Form input -->
        <ChatForm :errors="errors" @message-sent="addMessage" />
      </v-col>
    </v-row>

    <!-- Toast notification -->
    <v-row>
      <v-col>
        <v-snackbar
          v-model="snackbar.status"
          :color="snackbar.color"
          :timeout="snackbar.timeout"
        >
          {{ snackbar.content }}
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar.status = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChatForm from "@/components/Chat/ChatForm";
import ChatMessages from "@/components/Chat/ChatMessages";
import ChatRooms from "@/components/Chat/ChatRooms";
import { mapMutations, mapState } from "vuex";
import {
  FetchMessages,
  FetchChatRooms,
  SendMessage,
} from "@/Apis/HealthyFormWebApi/ChatApi";
import { UPDATE_LOADING_STATUS } from "@/store/mutation-types/chat-mutation-types";

export default {
  name: "Chat",
  components: { ChatRooms, ChatMessages, ChatForm },
  mounted() {
    this.fetchChatRooms();

    // Listen for new chat room created
    Echo.private(`chat-room.${this.userAuthenticated.id}`).listen(
      "ChatRoomCreated",
      (e) => {
        console.log(e);
        this.fetchChatRooms();
        setTimeout(() => {
          this.playSound();
        }, 3000);
      }
    );
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
    ...mapState("CHATS", ["targetUserId", "chatRoomId"]),
  },
  data() {
    return {
      messages: [],
      chatRooms: [],
      soundUrl: require("@/sounds/facebook/FacebookMsgTone.mp3"),
      snackbar: {
        status: false,
        color: "",
        content: "",
        timeout: 3000,
      },
      errors: {},
    };
  },

  methods: {
    ...mapMutations("CHATS", [UPDATE_LOADING_STATUS]),

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
        const response = await FetchMessages(this.chatRoomId);

        this.messages = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async addMessage(message) {
      try {
        let formData = new FormData();
        formData.append("message", message.message);
        formData.append("targetUserId", this.targetUserId);
        formData.append("chatRoomId", this.chatRoomId);

        if (message.files.length > 0) {
          for (let i = 0; i < message.files.length; i++) {
            formData.append("files[" + i + "]", message.files[i]);
          }
        }

        const response = await SendMessage(this.chatRoomId, formData);

        if (response.status === 201) {
          setTimeout(()=> {
            this.UPDATE_LOADING_STATUS(false);
          }, 2000)


          this.snackbar = {
            content: response.data.status,
            color: "success",
            status: true,
          };
          this.errors = {};
        }
      } catch (e) {
        console.log(e);
        if (e.response.status === 422) {
          this.errors = e.response.data;
        }

        this.snackbar = {
          content: "Error to send message!!!",
          color: "red",
          status: true,
        };
      }
    },

    /**
     * Play sound when retrieve new message
     */
    playSound() {
      const audio = new Audio(this.soundUrl);
      audio.play();
    },
  },
};
</script>

<style scoped></style>
