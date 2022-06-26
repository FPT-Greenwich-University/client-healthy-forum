<template>
  <v-row justify="center" v-if="isAuthenticated">
    <v-col class="col-xl-3 col-lg-3 col-md-3 col-sm-3">
      <v-btn
          :color="followStatus.color"
          block
          dark
          elevation="2"
          x-small
          @click="isFollowed ? unFollow(userID, postID) : addFollow(postID)"
      >
        {{ followStatus.message }}
        <v-icon
            dark
            x-small
        >
          {{ followStatus.icon }}
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import {mapState} from "vuex";
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi";

export default {
  name: "AddButton.vue",
  computed: {
    ...mapState('AUTH', ['userAuthenticated', 'isAuthenticated']),

    isFollowed() {
      return this.followStatus.status
    }
  },
  watch: {
    handleCheckFollow: {
      handler() {
        if (this.isAuthenticated) {
          this.userID = this.userAuthenticated.id

          if (this.userID !== undefined) {
            this.checkFollow(this.userAuthenticated.id, this.postID)
          }
        }
      },

      immediate: true
    }
  },
  data() {
    return {
      postID: this.$route.params.postID,
      userID: undefined,
      followStatus: {
        status: false,
        message: '',
        color: '',
        icon: ''
      },
    }
  },
  methods: {
    /**
     * Handle add post to a favorite list
     *
     * @param postID
     * @returns {Promise<void>}
     */
    async addFollow(postID) {
      try {
        const response = await HealthyFormWebApi().post('/users/favorites/posts', {post_id: postID})

        if (response) {
          await this.checkFollow(this.userAuthenticated.id, postID)
        }
      } catch (error) {
        console.log(error)
      }
    },

    async unFollow(userID, postID) {
      try {
        const response = await HealthyFormWebApi().delete(`/users/${userID}/favorites/posts/${postID}`)

        console.log(response)
        if (response) {
          await this.checkFollow(this.userAuthenticated.id, postID)
        }
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * If post in list favorite, then return true
     * otherwise false
     *
     * @param userID
     * @param postID
     * @returns {Promise<void>}
     */
    async checkFollow(userID, postID) {
      try {
        const response = await HealthyFormWebApi().get(`/users/${userID}/favorites/posts/${postID}`)
        console.log('check', response)

        if (response) {
          if (response.data === false) {

            this.followStatus = {status: false, message: "Add favorite", color: 'primary', icon: "fas fa-heart"}
          } else {
            this.followStatus = {status: true, message: "Remove favorite", color: 'red', icon: "fas fa-unlink"}
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>

</style>