<template>
  <div>
    <v-row>
      <v-col class="col-12">
        <v-card elevation="1">
          <v-card-title>Related Posts</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="post in posts"
        :key="post.id"
        class="col-12 col-xl-6 col-lg-6"
      >
        <RelatedPostItem :post="post" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { GetRelatedPostsByCategory } from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";
import PostItem from "@/components/Posts/PostItem";
import RelatedPostItem from "@/components/Posts/RelatedPost/RelatedPostItem";

export default {
  name: "RelatedPosts",
  components: { RelatedPostItem, PostItem },
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
