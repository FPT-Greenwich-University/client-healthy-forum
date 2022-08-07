<template>
  <v-col class="col-7">
    <v-card elevation="0" color="greenMoodBoard3">
      <v-card-title class="white--text">Post articles</v-card-title>
    </v-card>

    <v-divider class="my-5"></v-divider>

    <!--    List some posts-->
    <div v-if="!isEmptyPosts">
      <PostItem v-for="item in userPosts" :key="item.id" :item="item" />

      <!-- Button Read more posts -->
      <ReadMorePostsButton />
    </div>

    <div v-else>
      <p>Not have posts</p>
    </div>
  </v-col>
</template>
<script>
/**
 * Components
 * */
import EditPostButton from "@/components/Buttons/Posts/Profile/EditPostButton";
import PostItem from "@/components/Profiles/DoctorPosts/PostItem";
import ReadMorePostsButton from "@/components/Profiles/DoctorPosts/ReadMorePostsButton";

/**
 * Api call
 */
import { DoctorGetOwnPosts } from "@/Apis/HealthyFormWebApi/DoctorApi/DoctorApi";
import { GetPublishedPostsByUser } from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi.js";

/**
 * Vuex
 */
import { mapState, mapGetters } from "vuex";
export default {
  name: "DoctorPosts",
  components: { EditPostButton, PostItem, ReadMorePostsButton },
  computed: {
    ...mapState("AUTH", ["isOwnProfile"]),
    ...mapGetters("AUTH", ["isDoctor"]),

    isEmptyPosts() {
      return this.userPosts.length < 0;
    },
  },
  watch: {
    handleFetchUserPosts: {
      handler() {
        // if is owner profile
        if (this.isOwnProfile) {
          this.doctorFetchPosts(this.userId, 1); // Get all the posts
        } else {
          this.fetchPublishedPosts(this.userId, 1); // Get only published posts
        }
      },
      immediate: true,
    },
  },
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      userPosts: [],
    };
  },
  methods: {
    async doctorFetchPosts(userId, page = 1) {
      // If user is doctor
      if (this.isDoctor) {
        try {
          const response = await DoctorGetOwnPosts(userId, page);

          this.userPosts = response.data.data.filter((element, index) => {
            if (index < 2) {
              return element;
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    },

    // If user not is owner of current profile
    async fetchPublishedPosts(userId, page) {
      try {
        const response = await GetPublishedPostsByUser(userId, page);

        this.userPosts = response.data.data.filter((element, index) => {
          if (index < 2) {
            return element;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
