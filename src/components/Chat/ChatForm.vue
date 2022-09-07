<template>
  <v-row>
    <v-col>
      <v-card :loading="isLoading" outlined rounded>
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
          <v-card-subtitle v-if="errors.message" class="red--text"
            >{{ errors.message[0] }}
          </v-card-subtitle>

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
          <v-card-subtitle v-if="errors.files" class="red--text"
            >{{ errors.files[0] }}
          </v-card-subtitle>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="black--text"
            depressed
            outlined
            text
            @click="sendMessage"
          >
            Send
            <v-icon dark right> mdi-send</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { UPDATE_LOADING_STATUS } from "@/store/mutation-types/chat-mutation-types";

export default {
  name: "ChatForm",
  props: {
    errors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
    ...mapState("CHATS", ["isLoading"]), // Loading status for send the message
  },
  data() {
    return {
      newMessage: "",
      files: [],
    };
  },
  methods: {
    ...mapMutations("CHATS", [UPDATE_LOADING_STATUS]),

    sendMessage() {
      this.$emit("message-sent", {
        user: this.userAuthenticated,
        message: this.newMessage,
        files: this.files,
      });

      this.UPDATE_LOADING_STATUS(true);

      //Clear the input
      this.newMessage = "";
      this.files = [];
    },
  },
};
</script>

<style scoped></style>
