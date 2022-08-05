<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="isAuthenticated"
        color="deep-purple lighten-2"
        dark
        max-width="20%"
        v-bind="attrs"
        x-small
        v-on="on"
      >
        Edit
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> Edit Content</v-card-title>

      <v-card-text>
        <v-textarea
          v-model="content"
          clear-icon="mdi-close-circle"
          clearable
          counter
          label="Content"
          value=""
        ></v-textarea>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="cancelEdit"> Cancel</v-btn>
        <v-btn color="primary" text @click="updateComment"> I accept</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapState } from "vuex";

/**
 * Apis
 */
import {
  GetDetailComment,
  UpdateComment,
} from "@/Apis/HealthyFormWebApi/PostApi/CommentApi";

export default {
  name: "EditComment",
  props: {
    commentId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState("AUTH", ["isAuthenticated"]),
  },
  data() {
    return {
      dialog: false,
      content: "",
    };
  },
  watch: {
    dialog(newValue, oldValue) {
      if (newValue === true) {
        this.fetchDetailComment();
      }
    },
  },
  methods: {
    ...mapActions(["fetchComments"]),
    async fetchDetailComment() {
      let payload = {
        postId: this.$route.params.postId,
        commentId: this.commentId,
      };

      try {
        const response = await GetDetailComment(payload);

        if (response.status === 200) {
          this.content = response.data.content;
        }
      } catch (error) {
        console.log(error);
      }
    },

    cancelEdit() {
      this.content = "";
      this.dialog = false;
    },

    async updateComment() {
      try {
        let payload = {
          postId: this.$route.params.postId,
          commentId: this.commentId,
          content: this.content,
        };

        const response = await UpdateComment(payload);

        if (response.status === 204) {
          this.dialog = false;
          this.$emit("handle-fetch-comments");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
