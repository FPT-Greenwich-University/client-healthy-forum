<template>
  <v-col class="col-7">
    <v-card
        elevation="1"
    >
      <v-card-title>Post articles</v-card-title>
    </v-card>
    <v-divider class="my-5"></v-divider>
    <template v-for="item in userPosts">
      <!--    List all posts-->
      <v-card
          class="my-5"
          elevation="1"
      >
        <v-card-text>
          <v-img
              :src="`${backEndURL}/${item.image.path}`"
              aspect-ratio="2"
              class="rounded"
          >
          </v-img>
          <p class="font-weight-bold mt-5">{{ item.title }}</p>
          <p>Rating: 4.5</p>
          <p>Like: 55</p>
        </v-card-text>

        <v-card-actions>
          <v-row class="flex flex-row justify-space-between">
            <v-col class="text-left">
              <v-btn
                  class="text-decoration-underline"
                  color="primary"
                  depressed
                  plain
                  text
                  tile
                  @click="handleDetailPost(item.id)"
              >
                Read more
              </v-btn>
            </v-col>

            <!--    Owner's profile action   -->
            <v-col v-if="isOwnProfile" class="text-right">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      dark
                      small
                      v-bind="attrs"
                      v-on="on"
                  >
                    Action
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <EditPostButton :postID="item.id"/>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </template>
  </v-col>
</template>
<script>
import Api from "@/Apis/Api";
import EditPostButton from "@/components/Buttons/Posts/Profile/EditPostButton";
import {mapState} from "vuex";

export default {
  name: "DoctorPosts",
  components: {EditPostButton},
  computed: {
    ...mapState('AUTH', ['isOwnProfile'])
  },
  watch: {
    handleFetchUserPosts: {
      handler() {
        this.fetchUserPosts(this.userID)
      },
      immediate: true
    }
  },
  props: {
    userID: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      userPosts: [],
      backEndURL: process.env.VUE_APP_BACKEND_URL
    }
  },
  methods: {
    async fetchUserPosts(userID) {
      try {
        const response = await Api().get(`/users/${userID}/posts`);
        this.userPosts = response.data;
      } catch (e) {
        console.log(e)
      }
    },

    handleDetailPost(postID) {
      this.$router.push({name: 'TheDoctorPostDetails', params: {postID: postID}})
    }
  }
}
</script>