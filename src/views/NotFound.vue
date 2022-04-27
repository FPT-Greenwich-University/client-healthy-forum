<template>
  <v-container>
    <v-row justify="center">
      <v-col class="col-12">
        <v-card
            class="col-6 mx-auto ma-2"
            elevation="1"
        >
          <v-card-title class="text-capitalize text-h5">Page not found!</v-card-title>
          <v-card-subtitle class="text--darken-4 text-h5">404 Error</v-card-subtitle>
          <v-card-actions>
            <v-btn
                @click="()=> {$router.push('/') }"
            >
              <v-icon>
                mdi-home
              </v-icon>
              Back to home page
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "NotFound",

}
</script>