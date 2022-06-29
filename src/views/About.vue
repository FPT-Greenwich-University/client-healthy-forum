<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="344">
          <v-img :src="userInfo.avatar_url" height="200px"></v-img>

          <v-card-title> {{ userInfo.name }}</v-card-title>

          <v-card-subtitle
            >Github Repository:
            <a :href="userInfo.html_url">{{ userInfo.login }}</a>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange lighten-2" text> Explore</v-btn>

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
        const myLoginName = "ngocphuocha";
        const response = await GetAuthorInformation(myLoginName);
        console.log(response);
        if (response) {
          this.userInfo = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>