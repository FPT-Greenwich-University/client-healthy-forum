<template>
  <v-container>
    <!-- Category name -->
    <v-row justify="center">
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10">
        <v-card class="mx-auto text-center" elevation="0">
          <v-card-subtitle>
            Published At {{ postDetail.published_at }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!--  Tags  -->
    <v-row justify="center">
      <TheTags :postId="postId" />
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
  </v-container>
</template>

<script>
// TODO: fix postId to postId
import { mapActions, mapGetters, mapState } from "vuex";
// Components
import TheComments from "@/components/Public/Posts/DetailPost/Comments/TheComments";
import TheTags from "@/components/Public/Posts/DetailPost/Tags/TheTags";
import FormInputComment from "@/components/User/Comment/FormInputComment";
import LikeButton from "@/components/User/Like/LikeButton";
import DeletePostButton from "@/components/Public/Posts/Doctors/DeletePostButton";
import TotalLike from "@/components/User/Like/TotalLike";
import { DoctorGetDetailPost } from "@/Apis/HealthyFormWebApi/DoctorApi/DoctorApi";
import { SET_DETAIL_POST } from "@/store/mutation-types/post-mutation-types";

export default {
  name: "ThePostDetails",
  components: {
    DeletePostButton,
    TotalLike,
    LikeButton,
    FormInputComment,
    TheTags,
    TheComments,
  },

  computed: {
    ...mapState("POSTS", ["postDetail", "totalLikes"]),
    ...mapState("AUTH", ["userAuthenticated"]),
    ...mapGetters("AUTH", ["isDoctor"]),
    isThePostOwner() {
      return this.userAuthenticated.id === this.postDetail.user_id;
    },
  },
  watch: {
    fetchPost: {
      handler: function () {
        if (this.$route.name === "TheDoctorPostDetails" && this.isDoctor) {
          this.doctorGetDetailPost(
            this.$route.params.userId,
            this.$route.params.postId
          );
        } else {
          this.getDetailPost(this.$route.params.postId);
        }

        this.getTotalLikeOfPost(this.$route.params.postId);
      },
      immediate: true,
    },
  },
  data() {
    return {
      postId: Number(this.$route.params.postId),
      backEndURL: process.env.VUE_APP_BACKEND_URL,
    };
  },
  methods: {
    ...mapActions("POSTS", [
      "getDetailPost",
      "getTotalLikeOfPost",
      "doctorGetDetailPost",
    ]),

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
