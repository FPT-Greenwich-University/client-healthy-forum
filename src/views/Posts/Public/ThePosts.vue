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
        <v-btn color="blue" plain text @click="handleGetPosts(1)">filter</v-btn>
        <v-btn plain text @click="resetFilter">reset</v-btn>
      </v-col>
    </v-row>

    <!--  No posts  -->
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
        <Paginate @change-page="handleGetPosts"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {mapActions, mapState} from "vuex";
import Paginate from "@/components/Paginate";
import CreatePost from "@/views/Posts/Doctors/CreatePost";
import {
  GetCategories,
  GetTags,
} from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";

export default {
  name: "ThePosts",
  components: {
    CreatePost,
    Paginate,
  },
  computed: {
    ...mapState(["posts"]),
  },
  watch: {
    handleGetCategories: {
      handler() {
        this.fetchCategories();
      },
      immediate: true,
    },
    fetchTags: {
      handler() {
        this.fetchTags();
      },
      immediate: true,
    },

    // Get all the post when a rendering component
    fetchPosts: {
      handler() {
        this.handleGetPosts(1);
      },
      immediate: true,
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
    };
  },
  methods: {
    ...mapActions(["fetchPosts"]),

    handleGetPosts(page = 1) {
      let payload = {
        categoryId: this.categoryId,
        tagId: this.tagId,
        page: page,
      };
      this.fetchPosts(payload);
    },

    handleDetailPost(postID) {
      this.$router.push(`/posts/${postID}`);
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
    },
  },
};
</script>