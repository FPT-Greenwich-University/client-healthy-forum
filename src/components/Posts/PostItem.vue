<template>
  <v-col class="col-12 col-xl-6 col-lg-6 col-md-6">
    <v-card color="white" elevation="0" class="">
      <v-card-text>
        <v-img
          v-if="post.image.path"
          :src="`${backEndURL}/${post.image.path}`"
          aspect-ratio="2"
        ></v-img>
      </v-card-text>

      <v-card-title class="white--text">{{ post.title }}</v-card-title>

      <v-card-subtitle>
        <v-btn
          :to="{ name: 'UserProfiles', params: { userId: post.user.id } }"
          class="px-0 my-0 "
          plain
          small
          text
        >
          Author: {{ post.user.name }}
        </v-btn>
      </v-card-subtitle>

      <v-card-subtitle>
        <v-btn
          :to="{ name: 'Posts', query: { category: post.category.id } }"
          small
          color="White"
        >
          Category: {{ post.category.name }}
        </v-btn>
      </v-card-subtitle>

      <v-card-subtitle>
        <!--   View detail post by doctor  -->
        <v-btn
          v-if="this.$route.name === 'TheDoctorPosts'"
          :to="{
            name: 'TheDoctorPostDetails',
            params: { userId: post.user.id, postId: post.id },
          }"
          color="White"
          small
        >
          Read more
        </v-btn>

        <!--   View detail post   -->
        <v-btn
          v-else
          :to="{
            name: 'ThePostDetails',
            params: { postId: post.id },
          }"
          color="White"
          small
        >
          Read more
        </v-btn>
      </v-card-subtitle>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      backEndURL: process.env.VUE_APP_BACKEND_URL,
    };
  },
};
</script>
