<template>
  <v-container>
    <!-- Category name -->
    <v-row justify="center">
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10">
        <v-card
            class="mx-auto text-center"
            elevation="0"
        >
          <v-card-subtitle>
            Published At {{ postDetail.published_at }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!--  Tags  -->
    <v-row justify="center">
      <TheTags :postID="postID"/>
    </v-row>

    <!--  Introduce title and description  -->
    <v-row>
      <!--Post Title-->
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto">
        <p class="text-capitalize text-h6 text-center">{{ postDetail.title }}</p>
        <p class="text-capitalize text-xl-subtitle-1 text-center">{{ postDetail.description }}</p>
      </v-col>
    </v-row>

    <!--  Image  -->
    <v-row>
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto text-center">
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
        <v-card
            elevation="0"
        >
          <v-card-text class="text-left">
            {{ postDetail.body }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--  Total like  -->
    <TotalLike> {{ totalLikes }}</TotalLike>
    <!--  Like button  -->
    <LikeButton :postID="postID"/>

    <!--  Form comment  -->
    <FormInputComment :postID="postID"/>

    <!--List Comments-->
    <TheComments :postID="postID"/>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
// Components
import TheComments from "@/components/Public/Posts/DetailPost/Comments/TheComments";
import TheTags from "@/components/Public/Posts/DetailPost/Tags/TheTags";
import FormInputComment from "@/components/User/Comment/FormInputComment";
import LikeButton from "@/components/User/Like/LikeButton";
import TotalLike from "@/components/User/Like/TotalLike";

export default {
  name: "ThePostDetails",
  components: {
    TotalLike,
    LikeButton,
    FormInputComment,
    TheTags,
    TheComments
  },
  computed: {
    ...mapState('POSTS', ['postDetail', 'totalLikes'])
  },
  watch: {
    fetchPost: {
      handler: function (newValue) {
        this.getDetailPost(this.$route.params.postID)
        this.getTotalLikeOfPost(this.$route.params.postID)
      },
      immediate: true
    }
  },
  data() {
    return {
      postID: Number(this.$route.params.postID),
      backEndURL: process.env.VUE_APP_BACKEND_URL,
    }
  },
  methods: {
    ...mapActions("POSTS", ['getDetailPost', 'getTotalLikeOfPost'])
  }
}
</script>