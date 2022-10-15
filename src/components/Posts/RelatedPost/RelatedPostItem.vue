<template>
  <v-card color="white" elevation="0">
    <v-card-text>
      <v-img
        v-if="post.image.path"
        :src="`${backEndURL}/${post.image.path}`"
        aspect-ratio="2"
        max-height="200"
        max-width="200"
      ></v-img>
    </v-card-text>

    <v-card-title class="black--text">{{ post.title }}</v-card-title>

    <v-card-subtitle>
      <v-btn
        :to="{ name: 'UserProfiles', params: { userId: post.user.id } }"
        class="white--text"
        color="blackBrown"
        plain
        rounded
        small
        title
      >
        Author: {{ post.user.name }}
      </v-btn>
    </v-card-subtitle>

    <v-card-subtitle>
      <v-btn
        :to="{ name: 'Posts', query: { category: post.category.id } }"
        class="black--text"
        color="blackBrown"
        rounded
        small
        text
      >
        <span class="black--text">Category: </span>
        <span class="black--text text-decoration-underline">{{
          post.category.name
        }}</span>
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
        class="white--text text-decoration-underline heading"
        color="blackBrown"
        rounded
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
        class="white--text text-decoration-underline"
        color="blackBrown"
        rounded
        small
        text
      >
        Read more
      </v-btn>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "RelatedPostItem",
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
