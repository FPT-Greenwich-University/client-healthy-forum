<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="error"
          dark
          v-bind="attrs"
          x-small
          @click="dialog = true"
          v-on="on"
        >
          <v-icon x-small> fas fa-trash</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Are you sure to delete this post?
        </v-card-title>
        <v-card-text>
          After delete post, the resources relate to this post will remove and
          cannot restore!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="deletePost"> Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { DeletePost } from "@/Apis/HealthyFormWebApi/AdminApi/AdminApi";

export default {
  name: "AdminDeletePost",
  props: {
    postID: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      dialog: false,
      snackbar: false,
    };
  },
  methods: {
    async deletePost() {
      try {
        const res = await DeletePost(this.postID);

        if (res) {
          this.dialog = false;
          setTimeout(
            () => this.$emit("delete-post", "Delete post success"),
            100
          );
        }
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>
