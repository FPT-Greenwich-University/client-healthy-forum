<template>
  <v-container>
    <v-row class="d-flex flex-row mx-auto">
      <v-col class="col-3">
        <v-select
            v-model="categoryId"
            :attach="true"
            :items="categories"
            chips
            item-text="name"
            item-value="id"
            label="Category"
            multiple
        ></v-select>
      </v-col>

      <!--   Select tag   -->
      <v-col class="col-3">
        <v-select
            v-model="tagId"
            :attach="true"
            :items="tags"
            chips
            item-text="name"
            item-value="id"
            label="Tags"
            multiple
        ></v-select>
      </v-col>

      <v-col class="text-end d-flex align-center">
        <v-btn
            class="white--text mr-3"
            color="blackBrown"
            rounded
            @click="handleGetPosts(1)"
        >filter
          <v-icon>mdi-filter</v-icon>
        </v-btn>
        <v-btn color="gray" rounded @click="resetFilter"
        >reset
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!--  List posts item  -->
    <v-row>
      <PostItem v-for="post in posts" :key="post.id" :post="post"/>
    </v-row>

    <!-- Paginate -->
    <v-row v-if="posts.length > 0">
      <v-col>
        <Paginate @change-page="handleGetPosts"/>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col class="text-center">
        <p class="">No posts found</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {mapActions, mapState} from "vuex";
import Paginate from "@/components/Paginate";
import CreatePost from "@/views/Posts/Doctors/CreatePost";
import PostItem from "@/components/Posts/PostItem";
import {
  GetCategories,
  GetTags,
} from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";

export default {
  name: "ThePosts",
  components: {
    PostItem,
    CreatePost,
    Paginate,
  },
  computed: {
    ...mapState(["posts"]),
  },
  watch: {
    getCategories: {
      handler() {
        this.fetchCategories();
      },
      immediate: true,
    },

    getTags: {
      handler() {
        this.fetchTags();
      },
      immediate: true,
    },

    getPosts: {
      handler() {
        this.handleGetPosts(1);
      },
      immediate: true,
    },

    // Fetch post if url state change
    $route(to, from) {
      this.handleGetPosts(1);
    },

    // Get post by category
    categoryId() {
      this.handleGetPosts(1);
    },
    tagId() {
      this.handleGetPosts(1);
    },
  },

  data() {
    return {
      backEndURL: process.env.VUE_APP_BACKEND_URL,
      categories: [],
      categoryId: null,
      tags: [],
      tagId: null,
      url: "",
    };
  },
  methods: {
    ...mapActions(["fetchPosts", "fetchPostsByTag", "fetchPostByCategory"]),

    handleGetPosts(page = 1) {
      let payload = {
        categoryId: this.categoryId,
        tagId: this.tagId,
        page: page,
      };

      // If the current url include query tag
      if (this.$route.query.tag) {
        payload = {
          page: page,
          tagId: this.$route.query.tag,
        };
        this.fetchPostsByTag(payload); // Get post by tag
      } else if (this.$route.query.category) {
        payload = {
          page: page,
          categoryId: this.$route.query.category,
        };
        this.fetchPostByCategory(payload); // Get post by category
      } else {
        this.fetchPosts(payload); // Default fetch posts by filter
      }
    },

    async fetchCategories() {
      try {
        const response = await GetCategories();

        if (response) {
          this.categories = response.data;
        }
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    },
    async fetchTags() {
      try {
        const response = await GetTags();

        if (response) {
          this.tags = response.data;
        }
      } catch (e) {
        console.log(e);
      }
    },

    resetFilter() {
      this.categoryId = null;
      this.tagId = null;

      // If url include query category then refresh url
      if (this.$route.query.category) {
        this.$router.push({name: "Posts"});
      }
    },
  },
};
</script>