<template>
  <div>
    <v-row class="text-center">
      <v-col>
        <v-btn :to="{ name: 'TheDoctorPosts' }" color="greenMoodBoard3" class="white--text" small>
          more posts
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ReadMorePostsButton",
};
</script>
