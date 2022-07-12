<template>
  <v-col class="col-12 col-xl-6 col-lg-6 col-md-6">
    <v-card elevation="0">
      <v-card-text>
        <v-img
          v-if="post.image.path"
          :src="`${backEndURL}/${post.image.path}`"
          aspect-ratio="2"
        ></v-img>
      </v-card-text>

      <v-card-title>{{ post.title }}</v-card-title>

      <v-card-subtitle>
        Author:
        <v-btn
          :to="{ name: 'UserProfiles', params: { userId: post.user.id } }"
          class="px-0 my-0"
          plain
          small
          text
        >
          {{ post.user.name }}
        </v-btn>
      </v-card-subtitle>

      <v-card-subtitle>
        <v-btn
          :to="{ name: 'Posts', query: { category: post.category.id } }"
          primary
          x-small
        >
          Category: {{ post.category.name }}
        </v-btn>
      </v-card-subtitle>

      <v-card-actions>
        <v-btn
          :to="{
            name: 'TheDoctorPostDetails',
            params: { userId: post.user.id, postId: post.id },
          }"
          class="text-decoration-underline"
          color="primary"
          depressed
          plain
          text
          tile
        >
          Read more
        </v-btn>
      </v-card-actions>
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
