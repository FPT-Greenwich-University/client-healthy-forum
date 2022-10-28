<template>
  <div>
    <v-row class="text-center">
      <v-col>
        <!--Doctor get more posts-->
        <v-btn
          rounded
          v-if="isOwnProfile"
          :to="{
            name: 'TheDoctorPosts',
            params: { userId: $route.params.userId },
          }"
          class="white--text"
          color="greenMoodBoard3"
          small
        >
          More My Posts
        </v-btn>

        <!--Another user get more posts-->
        <v-btn
          v-else
          rounded
          :to="{
            name: 'PublishDoctorPosts',
            params: { userId: $route.params.userId },
          }"
          class="white--text"
          color="greenMoodBoard3"
          small
        >
          more posts
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ReadMorePostsButton",
  computed: {
    ...mapState("AUTH", ["isOwnProfile"]),
  },
};
</script>
