<template>
  <v-container>
    <v-row class="mt-12">
      <v-col class="col-12">
        <v-card class="mx-auto" max-width="344">
          <v-img :src="userInfo.avatar_url" height="200px"></v-img>

          <v-card-title> {{ userInfo.name }}</v-card-title>

          <v-card-subtitle
            >Github Repository:
            <a :href="userInfo.html_url">{{ userInfo.login }}</a>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="blackBrown"
              rounded
              text
              @click="redirectGitHubProfile"
            >
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon
                >{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}
              </v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                {{ userInfo.bio }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { GetAuthorInformation } from "@/Apis/GithubApi/UserApi/UserApi";

export default {
  name: "About",
  data() {
    return {
      show: false,
      userInfo: {
        login: "",
        id: null,
        avatar_url: "",
        html_url: "",
        repos_url: "",
        name: "",
        company: "",
        blog: "",
        location: "",
        bio: "",
      },
    };
  },
  watch: {
    fetchAuthorInfo: {
      handler() {
        this.handleFetchAuthorInfo();
      },
      immediate: true,
    },
  },
  methods: {
    async handleFetchAuthorInfo() {
      try {
        const response = await GetAuthorInformation("ngocphuocha");
        this.userInfo = response.data;
      } catch (error) {
        console.log(error);
      }
    },

    redirectGitHubProfile() {
      window.open(this.userInfo.html_url);
    },
  },
};
</script>
