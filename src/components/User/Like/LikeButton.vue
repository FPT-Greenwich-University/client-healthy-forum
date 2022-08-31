<template>
  <v-row v-if="isAuthenticated">
    <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto">
      <!--   Like button   -->
      <v-tooltip v-if="isExistLike === false" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            color="white1"
            rounded
            @click="handleLikePost"
            v-on="on"
          >
            Like
            <v-icon color="red" dark dense right> fas fa-heart</v-icon>
          </v-btn>
        </template>
        <span>Click to like this post</span>
      </v-tooltip>

      <!--   Unlike button   -->
      <v-tooltip v-else bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" @click="handleUnlikePost" v-on="on">
            UnLike
            <v-icon color="red" dark dense right> fas fa-heart</v-icon>
          </v-btn>
        </template>
        <span>Click to unlike this post</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>
<script>
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";
import { mapActions, mapState } from "vuex";

export default {
  name: "LikeButton",
  props: {
    postId: {
      required: true,
      type: Number,
    },
  },
  computed: {
    ...mapState("AUTH", ["isAuthenticated"]),
  },
  watch: {
    handleCheckLikeIsExist: {
      handler() {
        this.checkLikeIsExist();
      },
      immediate: true,
    },
  },
  data() {
    return {
      isExistLike: false,
    };
  },
  methods: {
    ...mapActions("POSTS", ["getTotalLikeOfPost"]),

    /**
     * Handle check if user is like the post
     *
     * @returns {Promise<void>}
     */
    async checkLikeIsExist() {
      if (this.isAuthenticated) {
        try {
          const res = await HealthyFormWebApi().get(
            `/posts/${this.postId}/likes/is-exist`
          );
          // console.log("check Like", res);
          if (res) {
            this.isExistLike = res.data;
          }
        } catch (e) {
          if (e) {
            console.log(e);
          }
        }
      }
    },

    /**
     * Handle user like the post
     *
     * @returns {Promise<void>}
     */
    async handleLikePost() {
      try {
        await HealthyFormWebApi().post(`/posts/${this.postId}/likes`);
        await this.checkLikeIsExist();
        await this.getTotalLikeOfPost(this.postId);
      } catch (e) {
        console.log("Like error", e);
      }
    },

    /**
     * Handle unlike the post
     *
     * @returns {Promise<void>}
     */
    async handleUnlikePost() {
      try {
        await HealthyFormWebApi().delete(`/posts/${this.postId}/likes`);
        await this.checkLikeIsExist();
        await this.getTotalLikeOfPost(this.postId);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
