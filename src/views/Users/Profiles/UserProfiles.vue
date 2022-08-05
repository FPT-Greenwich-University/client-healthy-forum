<template>
  <v-container class="user-profile">
    <!--  Top profile  -->
    <v-row>
      <v-col class="col-12" transition="slide-x-transition">
        <v-card class="mt-2" color="#26c6da" dark elevation="0">
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
              <v-list-item-avatar
                v-if="userInfo.provider_id !== null"
                color="grey darken-3"
              >
                <v-img
                  :src="userInfo.image_url"
                  alt=""
                  class="elevation-6"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-avatar v-else color="grey darken-3">
                <v-img
                  alt=""
                  class="elevation-6"
                  src="https://kenh14cdn.com/2018/10/19/photo-1-15399608173151918722731.png"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ userInfo.name }}</v-list-item-title>
              </v-list-item-content>

              <v-row :align="center" justify="end">
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
        <v-card id="introduce" elevation="1">
          <v-card-title>Introduce</v-card-title>
          <v-card-actions
            v-if="isOwnProfile && userInfo.provider_id == null"
            class="d-flex flex-column justify-space-between"
          >
            <ChangeProfile @update-profile="handleFetchProfile" />

            <v-divider></v-divider>

            <!-- Change password dialog -->
            <ChangePassword />

            <v-divider></v-divider>
          </v-card-actions>

          <v-card-actions
            v-if="!isOwnProfile"
            class="d-flex flex-column justify-space-between"
          >
            <!--Form contract-->
            <ContractDoctor :doctor-email="userInfo.email" />
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
        </v-card>
      </v-col>
      <v-spacer></v-spacer>

      <DoctorPosts v-if="userInfo.id" :userId="userInfo.id" />
    </v-row>
  </v-container>
</template>
<script>
import ChangeProfile from "@/views/Users/Profiles/ChangeProfile";
import ChangePassword from "@/components/Auth/ChangePassword";
import DoctorPosts from "@/components/Public/Posts/Doctors/DoctorPosts";
import ContractDoctor from "@/components/Mail/ContractDoctor";

import { mapActions, mapState } from "vuex";

export default {
  name: "UserProfile",
  components: {
    ContractDoctor,
    DoctorPosts,
    ChangeProfile,
    ChangePassword,
  },
  data() {
    return {
      isOwn: false, // is current user authenticated own this profile
    };
  },
  computed: {
    ...mapState("AUTH", ["userInfo", "isOwnProfile", "userAuthenticated"]),
  },
  watch: {
    handleFetchProfile: {
      handler() {
        let userId = this.$route.params.userId;
        this.fetchProfile(userId);
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions("AUTH", ["fetchProfile"]),
    handleFetchProfile(userId) {
      this.fetchProfile(userId);
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
