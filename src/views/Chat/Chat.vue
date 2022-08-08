<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Chat Form</v-card-title>
          <v-card-text>
            <v-text-field v-model="newMessage" label="Message"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn class="white--text" color="Olive" @click="sendMessage">
              Send
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-divider class="ma-10"></v-divider>
        <v-card>
          <v-card-title>Message</v-card-title>
          <v-card-text>
            <v-card
              v-for="item in messages"
              :key="item.id"
              color="Olive"
              class="my-5"
              elevation="1"
            >
              <v-card-text>
                <p class="white--text">{{ item.user.name }}</p>
                <p class="black-text">{{ item.message }}</p>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";

export default {
  name: "Chat",
  mounted() {
    this.fetchMessages();

    Echo.private("chat").listen("MessageSent", (e) => {
      console.log(e);
      this.messages.push({
        message: e.message.message,
        user: e.user,
      });
    });
  },
  data() {
    return {
      newMessage: "",
      messages: [],
    };
  },
  methods: {
    async fetchMessages() {
      try {
        const response = await HealthyFormWebApi().get(`/messages`);
        this.messages = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    async sendMessage() {
      try {
        const response = await HealthyFormWebApi().post(`/messages`, {
          message: this.newMessage,
        });

        if (response.status === 201) {
          this.newMessage = "";
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
