<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>Chat Form</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newMessage"
            label="Message"
            @keyup.enter="sendMessage"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn class="white--text" color="Olive" @click="sendMessage">
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ChatForm",
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
  },
  data() {
    return {
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
      this.$emit("message-sent", {
        user: this.userAuthenticated,
        message: this.newMessage,
      });
      //Clear the input
      this.newMessage = "";
    },
  },
};
</script>

<style scoped></style>
