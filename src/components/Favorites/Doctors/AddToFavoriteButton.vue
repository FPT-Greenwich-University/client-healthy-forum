<template>
  <v-container v-if="isAuthenticated">
    <v-row>
      <v-col>
        <v-btn
          block
          class="text-caption text-xl-subtitle-1 text-lg-subtitle-1 d-none d-xl-block d-lg-block d-md-block d-sm-block"
          dark
          elevation="2"
          @click="isFollowed ? unFollow(userId, doctorId) : addFollow(doctorId)"
        >
          {{ followStatus.message }}
          <v-icon dark small>
            {{ followStatus.icon }}
          </v-icon>
        </v-btn>
        <v-btn
          class="d-block d-xl-none d-lg-none d-md-none d-sm-none"
          dark
          fab
          x-small
          @click="isFollowed ? unFollow(userId, doctorId) : addFollow(doctorId)"
        >
          <v-icon dark>
            {{ followStatus.icon }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import {
  AddFollow,
  CheckIsFollow,
  UnFollow,
} from "@/Apis/HealthyFormWebApi/CustomerApi/CustomerApi";

export default {
  name: "AddToFavoriteButton",
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
            this.checkFollow(this.userAuthenticated.id, this.doctorId);
          }
        }
      },

      immediate: true,
    },
  },
  data() {
    return {
      doctorId: this.$route.params.userId,
      userId: undefined,
      followStatus: {
        status: false,
        message: "",
        color: "",
        icon: "",
      },
    };
  },
  methods: {
    /**
     * Handle add doctor to a favorite list
     *
     * @param doctorId
     * @returns {Promise<void>}
     */
    async addFollow(doctorId) {
      try {
        const response = await AddFollow(doctorId);

        if (response) {
          await this.checkFollow(this.userAuthenticated.id, doctorId);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async unFollow(userId, doctorId) {
      try {
        userId = this.userAuthenticated.id;
        const response = await UnFollow(userId, doctorId);

        if (response) {
          await this.checkFollow(this.userAuthenticated.id, doctorId);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * If doctor in list favorite, then return true
     * otherwise false
     *
     * @param userId
     * @param doctorId
     * @returns {Promise<void>}
     */
    async checkFollow(userId, doctorId) {
      try {
        const response = await CheckIsFollow(userId, doctorId);

        if (response) {
          if (response.data === false) {
            this.followStatus = {
              status: false,
              message: "Follow",
              color: "primary",
              icon: "fas fa-heart",
            };
          } else {
            this.followStatus = {
              status: true,
              message: "Unfollow",
              color: "red",
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
