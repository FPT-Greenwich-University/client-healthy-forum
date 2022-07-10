<template>
  <v-container>
    <v-row justify="center">
      <v-col class="col-12 text-center ma-10">
        <h1 class="text-h5 text-capitalize">Page not found</h1>
        <v-btn :to="{ path: '/' }">
          <v-icon> mdi-home</v-icon>
          Back to home page
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "NotFound",
};
</script>
