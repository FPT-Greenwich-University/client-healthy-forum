<template>
  <v-container class="user-profile">
    <!--  Top profile  -->
    <v-row>
      <v-col class="col-12" transition="slide-x-transition">
        <v-card class="mt-2" color="blackBrown" dark elevation="1">
          <v-card-title>
            <v-icon large left> mdi-twitter</v-icon>
            <span class="text-h6 font-weight-light">Twitter</span>
          </v-card-title>

          <v-card-text v-if="userInfo.profile" class="text-h5 font-weight-bold">
            {{ userInfo.profile.description }}
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <!--  if user is google account-->
              <v-list-item-avatar v-if="isGoogleAccount" color="grey darken-3">
                <v-img
                  :src="userInfo.image_url"
                  alt=""
                  class="elevation-6"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-avatar v-else color="grey darken-3">
                <v-img
                  v-if="userInfo.image !== null"
                  :src="`${backEndUrl}/${userInfo.image.path}`"
                  alt="Avatar"
                  class="elevation-6"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ userInfo.name }}</v-list-item-title>
              </v-list-item-content>

              <v-row align="center" justify="end">
                <v-icon class="mr-1"> mdi-heart</v-icon>
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1"> mdi-share-variant</v-icon>
                <span class="subheading">45</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-5"></v-divider>

    <v-row>
      <v-col class="col-5">
        <v-card id="introduce" color="white1" elevation="1">
          <v-card-title class="black--text">Introduce</v-card-title>
          <v-card-actions
            v-if="isOwnProfile && userInfo.provider_id == null"
            class="d-flex flex-column"
          >
            <ChangeProfile @update-profile="handleFetchProfile" />

            <!-- Change password dialog -->
            <ChangePassword />
          </v-card-actions>

          <v-divider></v-divider>

          <v-card-actions
            v-if="!isOwnProfile"
            class="d-flex flex-column justify-space-between"
          >
            <!--Form contract-->
            <ContractDoctor :doctor-email="userInfo.email" />
            <!-- Chat -->
            <ChatButton />
          </v-card-actions>

          <v-divider class="m-4"></v-divider>

          <v-card-text v-if="userInfo.profile !== null">
            <p>Live at:</p>
            <p>
              Join at
              <span class="font-weight-bold">{{ userInfo.created_at }}</span>
            </p>
            <p>Have <span class="font-weight-bold">1K</span> follower</p>
          </v-card-text>
          <v-card-text v-else>
            <p>No information</p>
          </v-card-text>

          <template v-if="doctorRole && isAuthenticated && !isOwnProfile">
            <v-divider></v-divider>
            <AddFavoriteDoctor />
          </template>
        </v-card>
      </v-col>

      <v-spacer></v-spacer>

      <template v-if="doctorRole">
        <DoctorPosts :userId="userInfo.id" />
      </template>
    </v-row>
  </v-container>
</template>
<script>
import ChangeProfile from "@/views/Users/Profiles/ChangeProfile";
import ChangePassword from "@/components/Auth/ChangePassword";
import DoctorPosts from "@/components/Public/Posts/Doctors/DoctorPosts";
import ContractDoctor from "@/components/Mail/ContractDoctor";
import { GetUserWithRoles } from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";
import { mapActions, mapState } from "vuex";
import ChatButton from "@/components/Buttons/Chats/ChatButton";
import AddFavoriteDoctor from "@/components/Favorites/Doctors/AddFavoriteDoctor";

export default {
  name: "UserProfile",
  components: {
    AddFavoriteDoctor,
    ChatButton,
    ContractDoctor,
    DoctorPosts,
    ChangeProfile,
    ChangePassword,
  },
  computed: {
    ...mapState("AUTH", [
      "userInfo",
      "isOwnProfile",
      "userAuthenticated",
      "isAuthenticated",
    ]),
    isGoogleAccount() {
      if (this.userInfo) {
        return this.userInfo.provider_id !== null;
      }
    },
    doctorRole() {
      return this.userRoles.includes("doctor");
    },
  },
  data() {
    return {
      isOwn: false, // is current user authenticated own this profile
      backEndUrl: process.env.VUE_APP_BACKEND_URL,
      userRoles: [],
    };
  },
  watch: {
    handleFetchProfile: {
      handler() {
        let userId = this.$route.params.userId;
        this.fetchProfile(userId);
        this.fetchUserRoles(userId);
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions("AUTH", ["fetchProfile"]),
    handleFetchProfile(userId) {
      this.fetchProfile(userId);
    },

    /**
     * Fetch user roles by id param url of profile page
     */
    async fetchUserRoles(userId) {
      try {
        const res = await GetUserWithRoles(userId);
        console.log("User Roles", res);
        this.userRoles = res.data.roles.map((e) => e.name);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style scoped>
#introduce {
  position: sticky;
  top: 64px;
}
</style>
