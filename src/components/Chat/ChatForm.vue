<template>
  <v-row>
    <v-col>
      <v-card elevation="1">
        <!--<v-card-title>Chat Form</v-card-title>-->
        <v-card-text>
          <v-text-field
            v-model="newMessage"
            dense
            filled
            full-width
            label="Message"
            prepend-icon="mdi-comment-text"
            rounded
            @keyup.enter="sendMessage"
          ></v-text-field>
        </v-card-text>
        <v-file-input
          v-model="files"
          chips
          counter
          dense
          filled
          full-width
          label="File input"
          multiple
          placeholder="Pick your files"
          rounded
          show-size
          small-chips
        ></v-file-input>

        <v-card-actions>
          <v-btn class="white--text" color="Olive" @click="sendMessage">
            Send
            <v-icon dark right> mdi-send</v-icon>
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
      files: [],
    };
  },
  methods: {
    sendMessage() {
      this.$emit("message-sent", {
        user: this.userAuthenticated,
        message: this.newMessage,
        files: this.files,
      });

      //Clear the input
      this.newMessage = "";
      this.files = [];
    },
  },
};
</script>

<style scoped></style>
