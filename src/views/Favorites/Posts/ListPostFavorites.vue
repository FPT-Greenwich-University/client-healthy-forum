<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="1">
          <v-img
            height="250"
            src="https://images.pexels.com/photos/2383010/pexels-photo-2383010.jpeg"
          ></v-img>
          <v-card-title class="text-body-1 text-xl-h3 text-lg-h5 text-md-h6">
            My favorite posts
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        v-for="post in posts"
        :key="post.id"
        class="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6"
      >
        <v-card elevation="1">
          <v-card-title class="text-body-1 text-xl-h3 text-lg-h5 text-md-h6">
            {{ post.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ post.description }}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn
              :to="{ name: 'UserProfiles', params: { userID: post.userId } }"
              plain
              text
            >
              {{ post.userEmail }}
            </v-btn>
            <v-btn
              :to="{ name: 'ThePostDetails', params: { postID: post.id } }"
              color="green"
              outlined
              rounded
            >
              Read more
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Paginate @change-page="fetchFavoritePosts" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { GetFavoritePosts } from "@/Apis/HealthyFormWebApi/CustomerApi/CustomerApi";
import Paginate from "@/components/Paginate";
import { mapState } from "vuex";

export default {
  name: "ListPostFavorites",
  components: { Paginate },
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
  },
  data() {
    return {
      posts: [],
    };
  },
  watch: {
    handleFetchFavoritePosts: {
      handler() {
        this.fetchFavoritePosts(1);
      },
      immediate: true,
    },
  },
  methods: {
    async fetchFavoritePosts(page = 1) {
      const userId = this.userAuthenticated.id;

      try {
        const response = await GetFavoritePosts(userId, page);

        if (response) {
          this.posts = response.data.data;
          this.$store.commit("setCurrentPage", response.data.current_page);
          this.$store.commit("setLastPage", response.data.last_page);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
