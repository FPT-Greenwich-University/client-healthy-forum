<template>
  <v-col class="col-12 col-xl-6 col-lg-6 col-md-6">
    <v-card color="White" elevation="1">
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
          class="white--text"
          color="greenMoodBoard3"
          small
        >
          Author: {{ post.user.name }}
        </v-btn>
      </v-card-subtitle>

      <v-card-subtitle>
        <v-btn
          :to="{ name: 'Posts', query: { category: post.category.id } }"
          class="white--text"
          color="greenMoodBoard3"
          small
          text
        >
          <span class="black--text">Category: </span> {{ post.category.name }}
        </v-btn>
      </v-card-subtitle>

      <v-card-subtitle>
        <!--   View detail post   -->
        <v-btn
          :to="{
            name: 'ThePostDetails',
            params: { postId: post.id },
          }"
          class="white--text text-decoration-underline"
          color="greenMoodBoard3"
          small
          text
        >
          Read more
        </v-btn>
      </v-card-subtitle>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "PublishDoctorPostItem",
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

<style scoped></style>
