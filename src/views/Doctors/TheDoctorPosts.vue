<template>
  <v-container>
    <v-row>
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </v-row>

    <v-row>
      <v-col>
        <Paginate @change-page="fetchDoctorPosts" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/**
 * Components
 */
import PostItem from "@/components/Posts/PostItem.vue";
import Paginate from "@/components/Paginate.vue";
/**
 * Apis
 */
import { DoctorGetOwnPosts } from "@/Apis/HealthyFormWebApi/DoctorApi/DoctorApi.js";
export default {
  name: "TheDoctorPosts",
  components: {
    PostItem,
    Paginate,
  },
  watch: {
    handleFetchDoctorPosts: {
      handler() {
        this.fetchDoctorPosts(1);
      },
      immediate: true,
    },
  },
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async fetchDoctorPosts(page = 1) {
      try {
        if (!localStorage.getItem("token")) return; // If user is not authenticated then exit

        const userId = Number(this.$route.params.userId);
        const response = await DoctorGetOwnPosts(userId, page);

        this.posts = response.data.data;

        this.$store.commit("setCurrentPage", response.data.current_page);
        this.$store.commit("setLastPage", response.data.last_page);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
