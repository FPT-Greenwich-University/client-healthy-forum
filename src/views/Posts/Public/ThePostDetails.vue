<template>
  <v-container>
    <!-- Category name -->
    <v-row justify="center">
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10">
        <v-card class="mx-auto text-center" elevation="0">
          <v-card-subtitle v-if="isPublishedPost">
            Published At {{ postDetail.published_at }}
          </v-card-subtitle>

          <v-card-subtitle v-else>Not Published</v-card-subtitle>
          <v-card-subtitle>
            Total view: {{ postDetail.total_view }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <AddFavoritePost />

    <!--  Tags  -->
    <v-row justify="center">
      <TheTags :postId="postId" />
    </v-row>

    <v-row>
      <v-col
        class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto text-center"
      >
        <v-btn
          :to="{ name: 'Posts', query: { category: postDetail.category.id } }"
          primary
          color="white2"
          x-small
        >
          Category: {{ postDetail.category.name }}
        </v-btn>
      </v-col>
    </v-row>

    <!--  Introduce title and description  -->
    <v-row>
      <!--Post Title-->
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto">
        <p class="text-capitalize text-h6 text-center">
          {{ postDetail.title }}
        </p>
        <p class="text-capitalize text-xl-subtitle-1 text-center">
          {{ postDetail.description }}
        </p>
      </v-col>
    </v-row>

    <!--  Image  -->
    <v-row>
      <v-col
        class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto text-center"
      >
        <v-img
          v-if="postDetail.image"
          :src="`${backEndURL}/${postDetail.image.path}`"
          alt="post image"
          class="rounded-lg"
        >
        </v-img>
      </v-col>
    </v-row>

    <!--  Divider  -->
    <v-row>
      <v-col
        class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto text-center"
      >
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <!--  Body text  -->
    <v-row>
      <v-col
        class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto text-center"
      >
        <v-card elevation="0">
          <v-card-text class="text-left">
            {{ postDetail.body }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--  Delete button  -->
    <DeletePostButton v-if="isThePostOwner" :postId="postId" />

    <!--  Total like  -->
    <TotalLike> {{ totalLikes }}</TotalLike>
    <!--  Like button  -->
    <LikeButton :postId="postId" />

    <!--  Form comment  -->
    <FormInputComment :postId="postId" />

    <!--List Comments-->
    <TheComments :postId="postId" />

    <RelatedPosts :category-id="postDetail.category_id" />
  </v-container>
</template>

<script>
/**
 * Vue x
 */
import { mapActions, mapGetters, mapState } from "vuex";
import { SET_DETAIL_POST } from "@/store/mutation-types/post-mutation-types";
/**
 * Components
 */
import TheComments from "@/components/Public/Posts/DetailPost/Comments/TheComments";
import TheTags from "@/components/Public/Posts/DetailPost/Tags/TheTags";
import FormInputComment from "@/components/User/Comment/FormInputComment";
import LikeButton from "@/components/User/Like/LikeButton";
import DeletePostButton from "@/components/Public/Posts/Doctors/DeletePostButton";
import TotalLike from "@/components/User/Like/TotalLike";
import RelatedPosts from "@/components/Posts/PostDetail/RelatedPosts";
import AddFavoritePost from "@/components/Favorites/Posts/AddFavoritePost";

/**
 * Api
 */
import { DoctorGetDetailPost } from "@/Apis/HealthyFormWebApi/DoctorApi/DoctorApi";

export default {
  name: "ThePostDetails",
  components: {
    AddFavoritePost,
    DeletePostButton,
    TotalLike,
    LikeButton,
    FormInputComment,
    TheTags,
    TheComments,
    RelatedPosts,
  },

  computed: {
    ...mapState("POSTS", ["postDetail", "totalLikes"]),
    ...mapState("AUTH", ["userAuthenticated"]),
    ...mapGetters("AUTH", ["isDoctor"]),
    isThePostOwner() {
      return this.userAuthenticated.id === this.postDetail.user_id;
    },

    isPublishedPost() {
      return this.postDetail.is_published;
    },
  },
  watch: {
    handleFetchPost: {
      handler: function () {
        this.fetchPost();
      },
      immediate: true,
    },
    // If current route change then callback fetch detail post
    $route(to, from) {
      this.fetchPost();
    },
  },
  data() {
    return {
      postId: Number(this.$route.params.postId),
      backEndURL: process.env.VUE_APP_BACKEND_URL, // Backend domain url
    };
  },
  methods: {
    ...mapActions("POSTS", [
      "getDetailPost",
      "getTotalLikeOfPost",
      "doctorGetDetailPost",
    ]),

    /**
     * Fetch detail post when rendering page
     */
    fetchPost() {
      const userId = this.$route.params.userId;
      const postId = this.$route.params.postId;

      if (this.$route.name === "TheDoctorPostDetails" && this.isDoctor) {
        this.doctorGetDetailPost(userId, postId);
      } else {
        this.getDetailPost(postId);
      }

      this.getTotalLikeOfPost(postId);
    },

    /**
     * Get Detail post if user auth have role doctor
     * @param userId
     * @param postId
     * @returns {Promise<void>}
     */
    async doctorGetDetailPost(userId, postId) {
      try {
        const response = await DoctorGetDetailPost({ userId, postId });
        this.$store.commit(`POSTS/${SET_DETAIL_POST}`, response.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
