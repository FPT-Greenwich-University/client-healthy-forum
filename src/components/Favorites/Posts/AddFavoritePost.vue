<template>
  <v-row v-if="isAuthenticated" justify="center">
    <v-col class="col-xl-3 col-lg-3 col-md-3 col-sm-3">
      <!--Add follow button-->
      <v-btn
        v-if="!isFollowed"
        block
        class="white--text"
        color="Olive"
        elevation="2"
        x-small
        @click="addFollow(postId)"
      >
        {{ followStatus.message }}
        <v-icon color="red" right x-small>
          {{ followStatus.icon }}
        </v-icon>
      </v-btn>
      <!---->

      <!--Unfollow button-->
      <v-btn
        v-else
        block
        class="white--text"
        color="red"
        elevation="2"
        x-small
        @click="unFollow(userId, postId)"
      >
        {{ followStatus.message }}
        <v-icon color="white" right x-small>
          {{ followStatus.icon }}
        </v-icon>
      </v-btn>
      <!-- -->
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";

export default {
  name: "AddButton.vue",
  computed: {
    ...mapState("AUTH", ["userAuthenticated", "isAuthenticated"]),

    isFollowed() {
      return this.followStatus.status;
    },
  },
  watch: {
    handleCheckFollow: {
      handler() {
        if (this.isAuthenticated) {
          this.userId = this.userAuthenticated.id;

          if (this.userId !== undefined) {
            this.checkFollow(this.userAuthenticated.id, this.postId);
          }
        }
      },

      immediate: true,
    },
  },
  data() {
    return {
      postId: this.$route.params.postId,
      userId: undefined,
      followStatus: {
        status: false,
        message: "",
        icon: "",
      },
    };
  },
  methods: {
    /**
     * Handle add post to a favorite list
     *
     * @param postId
     * @returns {Promise<void>}
     */
    async addFollow(postId) {
      try {
        const response = await HealthyFormWebApi().post(
          "/users/favorites/posts",
          { post_id: postId }
        );

        if (response) {
          await this.checkFollow(this.userAuthenticated.id, postId);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async unFollow(userId, postId) {
      try {
        const response = await HealthyFormWebApi().delete(
          `/users/${userId}/favorites/posts/${postId}`
        );

        console.log(response);
        if (response) {
          await this.checkFollow(this.userAuthenticated.id, postId);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * If post in list favorite, then return true
     * otherwise false
     *
     * @param userId
     * @param postId
     * @returns {Promise<void>}
     */
    async checkFollow(userId, postId) {
      try {
        const response = await HealthyFormWebApi().get(
          `/users/${userId}/favorites/posts/${postId}`
        );
        console.log("check", response);

        if (response) {
          if (response.data === false) {
            this.followStatus = {
              status: false,
              message: "Add favorite",
              icon: "fas fa-heart",
            };
          } else {
            this.followStatus = {
              status: true,
              message: "Remove favorite",
              icon: "fas fa-unlink",
            };
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
