<template>
  <v-container>
    <v-row v-show="posts.length === 0">
      <v-col class="col-12">
        <p>No posts</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="item in posts"
        :key="item.id"
        class="col-12 col-xl-6 col-lg-6 col-md-6"
      >
        <v-card elevation="0">
          <v-card-text>
            <v-img
              v-if="item.image.path"
              :src="`${backEndURL}/${item.image.path}`"
              aspect-ratio="2"
            ></v-img>
          </v-card-text>

          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>
            Author:
            <v-btn
              :to="{ name: 'UserProfiles', params: { userID: item.user.id } }"
              class="px-0 my-0"
              plain
              small
              text
            >
              {{ item.user.name }}
            </v-btn>
          </v-card-subtitle>
          <v-card-subtitle>Category: {{ item.category.name }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
              class="text-decoration-underline"
              color="primary"
              depressed
              plain
              text
              tile
              @click="handleDetailPost(item.id)"
            >
              Read more
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Paginate -->
    <v-row v-if="posts.length > 0">
      <v-col>
        <Paginate @change-page="handleGetPosts" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import Paginate from "@/components/Paginate";
import CreatePost from "@/views/Posts/Doctors/CreatePost";

export default {
  name: "ThePosts",
  components: {
    CreatePost,
    Paginate,
  },
  computed: {
    ...mapState(["posts"]),
    currentRouteName() {
      return this.$route.name;
    },
  },
  watch: {
    // Get all the post when a rendering component
    fetchPosts: {
      handler() {
        if (this.currentRouteName === "PostsByTag") {
          // If the url route is post by tag
          this.handleGetPostsByTag(this.$route.params.tagID);
        } else if (this.currentRouteName === "Posts") {
          this.handleGetPosts();
        }
      },
      immediate: true,
    },
  },

  data() {
    return {
      backEndURL: process.env.VUE_APP_BACKEND_URL,
    };
  },
  methods: {
    ...mapActions(["fetchPosts", "fetchPostsByTag"]),

    handleGetPosts(page) {
      this.fetchPosts(page);
    },

    handleGetPostsByTag(page, tagID = this.$route.params.tagID) {
      this.fetchPostsByTag(page, tagID);
    },

    handleDetailPost(postID) {
      this.$router.push(`/posts/${postID}`);
    },
  },
};
</script>
