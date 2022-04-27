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
        <v-tab v-if="isDoctor" :to="{name: 'CreatePost'}">
          Create Post
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
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: 'App',
  components: {
    ItemMenu
  },
  computed: {
    ...mapState('AUTH', ['isAuthenticated']),
    ...mapGetters('AUTH', ['isDoctor'])
  },
  watch: {
    getUserInfo: {
      handler() {
        if (localStorage.getItem('token')) {
          this.fetchUserAuthInfo()
        }
      },
      immediate: true,
    }
  },
  data() {
    return {
      links: [
        'Home',
        'Posts',
      ]
    }
  },
  methods: {
    ...mapActions('AUTH', ["fetchUserAuthInfo"])
  },
};
</script>
