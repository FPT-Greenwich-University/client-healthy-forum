<template>
  <v-col class="col-7">
    <v-card
        elevation="1"
    >
      <v-card-title>Post articles</v-card-title>
    </v-card>
    <v-divider class="my-5"></v-divider>
    <template v-for="item in userPosts">
      <!--    List all posts-->
      <v-card
          class="my-5"
          elevation="1"
      >
        <v-card-text>
          <v-img class="rounded"
                 :src="`${backEndURL}/${item.image.path}`"
          >
          </v-img>
          <p class="font-weight-bold mt-5">{{ item.title }}</p>
          <p>Rating: 4.5</p>
          <p>Like: 55</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="primary"
              text
              depressed
              tile
              plain
              @click="handleDetailPost(item.id)"
              class="text-decoration-underline"
          >
            Read more
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-col>
</template>
<script>
import Api from "@/Apis/Api";

export default {
  name: "DoctorPosts",
  watch: {
    handleFetchUserPosts: {
      handler() {
        this.fetchUserPosts(this.userID)
      },
      immediate: true
    }
  },
  props: {
    userID: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      userPosts: [],
      backEndURL: process.env.VUE_APP_BACKEND_URL
    }
  },
  methods: {
    async fetchUserPosts(userID) {
      try {
        const response = await Api().get(`/users/${userID}/posts`);
        this.userPosts = response.data;
      } catch (e) {
        console.log(e)
      }
    },

    handleDetailPost(postID) {
      this.$router.push(`/posts/${postID}`)
    }
  }
}
</script>