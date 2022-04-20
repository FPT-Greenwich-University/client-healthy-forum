<template>
  <v-app>
    <v-app-bar
        app
        dark
        flat
    >
      <v-tabs
          centered
          class="ml-n9"
      >
        <v-tab to="/">
          Home
        </v-tab>

        <v-tab :to="{name: 'Posts'}">
          Posts
        </v-tab>
      </v-tabs>
      <ItemMenu/>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
// Components
import ItemMenu from "@/components/TopNav/ItemMenu";

export default {
  name: 'App',
  components: {
    ItemMenu
  },
  data() {
    return {
      links: [
        'Home',
        'Posts',
      ]
    }
  }
};
</script>
