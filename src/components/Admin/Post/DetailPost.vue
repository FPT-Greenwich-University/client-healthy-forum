<template>
  <v-row>
    <v-btn color="primary" dark x-small @click="fetchDetailPost">
      <v-icon x-small> fas fa-eye </v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar color="primary" dark>
          <v-btn dark icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Post Detail Setting</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Close </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list>
          <v-list-item>
            <v-btn @click="publishPost">Public this post</v-btn>
          </v-list-item>

          <v-subheader class="text-center text-h5 text-capitalize">{{
            post.title
          }}</v-subheader>

          <v-list-item>
            <v-img
              v-if="post.image"
              :src="`${backEndURL}/${post.image.path}`"
              alt="post image"
              class="mx-auto"
              max-width="600"
            >
            </v-img>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <p class="text-body-1 text-center">
                {{ post.body }}
              </p>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="post.user">
            <p>
              Author: <span class="text-lowercase">{{ post.user.email }}</span>
            </p>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import {
  AdminGetDetailPost,
  AdminUpdateStatusPost,
} from "@/Apis/HealthyFormWebApi/AdminApi/AdminApi";

export default {
  name: "DetailPost",
  props: {
    postId: {
      required: true,
      type: Number,
    },
  },
  watch: {},
  data() {
    return {
      post: {},
      dialog: false,
      backEndURL: process.env.VUE_APP_BACKEND_URL,
    };
  },
  methods: {
    async fetchDetailPost() {
      this.dialog = true;

      try {
        const res = await AdminGetDetailPost(this.postId); // console.log('Detail post', res.data)
        this.post = res.data;
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    },

    async publishPost() {
      try {
        const res = await AdminUpdateStatusPost(this.postId);

        if (res) {
          this.dialog = false;
          this.$emit("update-status");
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
