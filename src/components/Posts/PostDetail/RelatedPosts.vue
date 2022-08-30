<template>
  <v-row>
    <v-col class="col-12">
      <v-card elevation="0">
        <v-card-title>Related Posts</v-card-title>
      </v-card>
    </v-col>
    <v-col
      v-for="post in posts"
      :key="post.id"
      class="col-12 col-lg-4 col-xl-4 col-md-6 col-sm-6"
    >
      <v-card class="">
        <PostItem :post="post" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { GetRelatedPostsByCategory } from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";
import PostItem from "@/components/Posts/PostItem";

export default {
  name: "RelatedPosts",
  components: { PostItem },
  props: {
    categoryId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      posts: [],
    };
  },
  watch: {
    fetchRelatedPosts: {
      handler() {
        this.getRelatedPosts(this.categoryId);
      },
      immediate: true,
    },
  },
  methods: {
    async getRelatedPosts(categoryId) {
      try {
        const response = await GetRelatedPostsByCategory(categoryId);

        // If success
        if (response.status === 200) {
          this.posts = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>