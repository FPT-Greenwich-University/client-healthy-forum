<template>
  <v-row v-if="isAuthenticated">
    <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto">
      <!--   Like button   -->
      <v-tooltip bottom v-if="isExistLike === false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              @click="handleLikePost"
          >
            Like
            <v-icon
                right
                dark
                color="red"
                dense
            >
              fas fa-heart
            </v-icon>
          </v-btn>
        </template>
        <span>Click to like this post</span>
      </v-tooltip>

      <!--   Unlike button   -->
      <v-tooltip bottom v-else>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              @click="handleUnlikePost"
          >
            UnLike
            <v-icon
                right
                dark
                color="red"
                dense
            >
              fas fa-heart
            </v-icon>
          </v-btn>
        </template>
        <span>Click to unlike this post</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>
<script>
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi";
import {mapActions, mapState} from "vuex";

export default {
  name: "LikeButton",
  props: {
    postID: {
      required: true,
      type: Number
    }
  },
  computed: {
    ...mapState('AUTH', ['isAuthenticated'])
  },
  watch: {
    handleCheckLikeIsExist: {
      handler() {
        this.checkLikeIsExist()
      }, immediate: true
    }
  },
  data() {
    return {
      isExistLike: false
    }
  },
  methods: {
    ...mapActions('POSTS', ['getTotalLikeOfPost']),

    /**
     * Handle check if user is like the post
     *
     * @returns {Promise<void>}
     */
    async checkLikeIsExist() {
      if (this.isAuthenticated) {
        try {
          const res = await HealthyFormWebApi().get(`/posts/${this.postID}/likes/is-exist`)
          if (res) {
            this.isExistLike = res.data
          }
        } catch (e) {
          if (e) {
            console.log(e)
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
        await HealthyFormWebApi().post(`/posts/${this.postID}/likes`)
        await this.checkLikeIsExist()
        await this.getTotalLikeOfPost(this.postID)
      } catch (e) {
        if (e) {
          console.log('Like error', e)
        }
      }
    },

    /**
     * Handle unlike the post
     *
     * @returns {Promise<void>}
     */
    async handleUnlikePost() {
      try {
        await HealthyFormWebApi().delete(`/posts/${this.postID}/likes`)
        await this.checkLikeIsExist()
        await this.getTotalLikeOfPost(this.postID)
      } catch (e) {
        if (e) {
          console.log(e)
        }
      }
    }
  }
}
</script>