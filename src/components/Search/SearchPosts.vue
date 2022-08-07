<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="title"
          append-icon="mdi-magnify"
          background-color="blackMoodBoard1"
          clearable
          label="Search Posts"
          placeholder="Enter the post title"
          solo
        ></v-text-field>
      </v-col>
    </v-row>

    <!--  List posts item  -->
    <v-row>
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </v-row>

    <!-- Paginate  -->
    <v-row v-if="!isEmptyPosts">
      <v-col>
        <Paginate @change-page="searchPosts" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { SearchPosts } from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";
import Paginate from "@/components/Paginate";
import PostItem from "@/components/Posts/PostItem";

export default {
  name: "SearchPosts",
  components: { PostItem, Paginate },
  computed: {
    isEmptyPosts() {
      return this.posts.length === 0;
    },
  },
  data() {
    return {
      title: "",
      posts: [],
      backEndURL: process.env.VUE_APP_BACKEND_URL,
    };
  },
  watch: {
    title: {
      handler(newValue) {
        this.searchPosts();

        if (newValue.length === 0) {
          this.posts = [];
        }
      },
      deep: true,
    },
  },
  methods: {
    async searchPosts(page = 1) {
      if (this.title !== "") {
        try {
          const response = await SearchPosts(this.title, page);

          if (response.status === 200) {
            this.posts = response.data.data;
            this.$store.commit("setCurrentPage", response.data.current_page);
            this.$store.commit("setLastPage", response.data.last_page);
          }
        } catch (error) {
          if (error) {
            console.log("Error to search post", error);
          }
        }
      }
    },
  },
};
</script>

<style scoped></style>
