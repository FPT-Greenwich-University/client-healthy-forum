<template>
  <v-container>
    <v-row>
      <v-col class="mx-auto">
        <v-card
            elevation="0"
        >
          <v-card-title>Page not found!</v-card-title>
          <v-card-subtitle>404 Error</v-card-subtitle>
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