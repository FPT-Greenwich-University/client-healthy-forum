<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          v-if="isAuthenticated"
          class="mx-2"
          color="red"
          dark
          max-width="20%"
          v-bind="attrs"
          x-small
          v-on="on"
      >
        Delete
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Delete comment
      </v-card-title>

      <v-card-text> Are you sure delete this comment?</v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="cancelDelete"> Cancel</v-btn>
        <v-btn color="primary" text @click="deleteComment"> I accept</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import {mapState} from "vuex";
import {DeleteComment} from "@/Apis/HealthyFormWebApi/PostApi/CommentApi";

export default {
  name: "DeleteComment",
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
    };
  },
  methods: {
    cancelDelete() {
      this.dialog = false;
    },

    async deleteComment() {
      try {
        let payload = {
          postId: this.$route.params.postId,
          commentId: this.commentId,
        };

        await DeleteComment(payload);
        this.$emit("handle-fetch-comments");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>