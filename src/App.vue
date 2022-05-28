<template>
  <v-app>
    <v-app-bar
        app
        dark
        flat
        tile
    >

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-tabs
          centered
      >
        <v-tab to="/">
          Home
        </v-tab>

        <v-tab :to="{name: 'Posts'}">
          Posts
        </v-tab>

        <v-tab :to="{name: 'Search'}">
          Search
        </v-tab>

        <v-tab v-if="isAdmin" :to="{name: 'AdminDashBoard'}">
          Dashboard
        </v-tab>
      </v-tabs>
      <ItemMenu/>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        bottom
        fixed
        temporary
    >
      <v-list
          dense
          nav
      >
        <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-if="isDoctor">
            <v-list-item-title>
              <CreatePost/>
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="(!isDoctor || !isAdmin) && isCustomer">
            <v-list-item-title>
              <RegisterDoctorButton/>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
// Components
import ItemMenu from "@/components/TopNav/ItemMenu";
import {mapActions, mapGetters, mapState} from "vuex";
import CreatePost from "@/views/Posts/Doctors/CreatePost";
import ListRegisterDoctorRole from "@/components/Admin/User/Doctor/ListRegisterDoctorRole";
import RegisterDoctorButton from "@/components/User/Register/RegisterDoctorButton";

export default {
  name: 'App',
  components: {
    RegisterDoctorButton,
    ListRegisterDoctorRole,
    CreatePost,
    ItemMenu
  },
  computed: {
    ...mapState('AUTH', ['isAuthenticated']),
    ...mapGetters('AUTH', ['isCustomer', 'isDoctor', 'isAdmin'])
  },
  watch: {
    getUserInfo: {
      handler() {
        if (localStorage.getItem('token')) {
          this.fetchUserAuthInfo()
        }
      },
      immediate: true,
    },

    group() {
      this.drawer = false
    },
  },
  data() {
    return {
      links: [
        'Home',
        'Posts',
      ],
      drawer: false,
      group: null,
    }
  },
  methods: {
    ...mapActions('AUTH', ["fetchUserAuthInfo"])
  },
};
</script>
