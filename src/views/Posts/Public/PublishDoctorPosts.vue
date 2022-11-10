<template>
  <v-container>
    <!--  No posts  -->
    <v-row v-show="posts.length === 0">
      <v-col class="col-12">
        <p>No posts</p>
      </v-col>
    </v-row>

    <!--  List posts item  -->
    <v-row v-if="posts.length > 0">
      <PublishDoctorPostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </v-row>

    <!-- Paginate -->
    <v-row v-if="posts.length > 0">
      <v-col>
        <Paginate @change-page="fetchPosts" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Paginate from "@/components/Paginate";
import { GetPublishedPostsByUser } from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";
import PublishDoctorPostItem from "@/components/Posts/PublishDoctorPostItem";

export default {
  name: "PublishDoctorPosts",
  components: { PublishDoctorPostItem, Paginate },
  data() {
    return {
      posts: [],
    };
  },
  watch: {
    handleFetchPosts: {
      handler() {
        this.fetchPosts(1);
      },
      immediate: true,
    },
  },
  methods: {
    async fetchPosts(page) {
      try {
        const userId = this.$route.params.userId;
        const response = await GetPublishedPostsByUser(userId, page);
        this.posts = response.data.data;
        // console.log(this.posts);
        this.$store.commit("setCurrentPage", response.data.current_page);
        this.$store.commit("setLastPage", response.data.last_page);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
