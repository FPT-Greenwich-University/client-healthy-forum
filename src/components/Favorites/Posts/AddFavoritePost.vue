<template>
  <v-row v-if="isAuthenticated" justify="center">
    <v-col class="col-xl-3 col-lg-3 col-md-3 col-sm-3">
      <!--Add follow button-->
      <v-btn
        v-if="!isFollowed"
        block
        class="white--text"
        color="blackBrown"
        elevation="2"
        x-small
        @click="addFollow(postId)"
      >
        {{ followStatus.message }}
        <v-icon color="red" right x-small>
          {{ followStatus.icon }}
        </v-icon>
      </v-btn>

      <!--Remove favorite post button-->
      <v-btn
        v-else
        block
        class="white--text"
        rounded
        color="blackBrown"
        elevation="2"
        x-small
        @click="removePostFavorite(postId)"
      >
        {{ followStatus.message }}
        <v-icon color="white" right x-small>
          {{ followStatus.icon }}
        </v-icon>
      </v-btn>
    </v-col>

    <!-- Toast notification -->
    <v-snackbar
      v-model="snackbar.status"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.content }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar.status = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import {
  AddPostToFavorite,
  CheckPostFavoriteExisted,
  RemovePostFromFavorite,
} from "@/Apis/HealthyFormWebApi/CustomerApi/CustomerApi.js";

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
            this.checkPostFavoriteExisted(
              this.userAuthenticated.id,
              this.postId
            );
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
      snackbar: {}, // Toast
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
        const response = await AddPostToFavorite(postId);
        if (response.status === 201) {
          await this.checkPostFavoriteExisted(
            this.userAuthenticated.id,
            postId
          );

          this.snackbar = {
            content: "Add success",
            color: "greenMoodBoard3",
            status: true,
          };
        }
      } catch (error) {
        console.log(error);
      }
    },
    async removePostFavorite(postId) {
      try {
        const userId = this.userAuthenticated.id;
        const response = await RemovePostFromFavorite(userId, postId);
        if (response.status === 204) {
          await this.checkPostFavoriteExisted(
            this.userAuthenticated.id,
            postId
          );

          this.snackbar = {
            content: "Remove success",
            color: "greenMoodBoard3",
            status: true,
          };
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
    async checkPostFavoriteExisted(userId, postId) {
      try {
        const response = await CheckPostFavoriteExisted(userId, postId);
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
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
