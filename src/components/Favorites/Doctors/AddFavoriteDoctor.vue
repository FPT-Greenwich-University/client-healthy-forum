<template>
  <v-container v-if="isAuthenticated">
    <v-row>
      <v-col>
        <!--Add Follow doctor-->
        <template v-if="!isFollowed">
          <v-btn
            block
            class="text-caption text-xl-subtitle-1 text-lg-subtitle-1 d-none d-xl-block d-lg-block d-md-block d-sm-block"
            color="Olive"
            dark
            elevation="2"
            @click="addFollow(doctorId)"
          >
            {{ followStatus.message }}
            <v-icon dark small color="red">
              {{ followStatus.icon }}
            </v-icon>
          </v-btn>

          <v-btn
            class="d-block d-xl-none d-lg-none d-md-none d-sm-none"
            color="Olive"
            dark
            fab
            x-small
            @click="addFollow(doctorId)"
          >
            <v-icon dark color="red">
              {{ followStatus.icon }}
            </v-icon>
          </v-btn>
        </template>

        <!-- Remove follow doctor -->
        <template v-else>
          <v-btn
            block
            class="text-caption text-xl-subtitle-1 text-lg-subtitle-1 d-none d-xl-block d-lg-block d-md-block d-sm-block"
            color="greenMoodBoard4"
            dark
            elevation="2"
            @click="unFollow(doctorId)"
          >
            {{ followStatus.message }}
            <v-icon small color="red">
              {{ followStatus.icon }}
            </v-icon>
          </v-btn>

          <v-btn
            class="d-block d-xl-none d-lg-none d-md-none d-sm-none"
            color="greenMoodBoard4"
            dark
            fab
            x-small
            @click="unFollow(doctorId)"
          >
            <v-icon dark color="red">
              {{ followStatus.icon }}
            </v-icon>
          </v-btn>
        </template>

        <!-- Toast notification -->
        <v-snackbar
          v-model="snackbar.status"
          centered
          left
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import {
  AddFollow,
  CheckIsFollowDoctor,
  UnFollow,
} from "@/Apis/HealthyFormWebApi/CustomerApi/CustomerApi";

export default {
  name: "AddFavoriteDoctor",
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
      snackbar: {}, // Toast
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

        if (response.status === 201) {
          await this.checkFollow(this.userAuthenticated.id, doctorId);

          this.snackbar = {
            content: "Follow success",
            color: "greenMoodBoard3",
            status: true,
          };
        }
      } catch (error) {
        console.log(error);
      }
    },

    async unFollow(doctorId) {
      try {
        const userId = this.userAuthenticated.id;
        const response = await UnFollow(userId, doctorId);
        if (response.status === 204) {
          await this.checkFollow(this.userAuthenticated.id, doctorId);

          this.snackbar = {
            content: "Unfollow success",
            color: "greenMoodBoard3",
            status: true,
          };
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
        const response = await CheckIsFollowDoctor(userId, doctorId);

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
              message: "Un follow",
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
