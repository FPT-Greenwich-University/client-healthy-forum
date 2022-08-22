<template>
  <div>
    <v-app-bar app color="GreenLeaf" flat tile>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-tabs center-active centered>
        <v-tab class="white--text" to="/">Home</v-tab>

        <v-tab :to="{ name: 'Posts' }" class="white--text">Posts</v-tab>

        <v-tab :to="{ name: 'Search' }" class="white--text">Search</v-tab>

        <v-tab v-if="isAuthenticated" :to="{ name: 'Chat' }" class="white--text"
          >Chat</v-tab
        >

        <v-tab :to="{ name: 'About' }" class="white--text">About</v-tab>

        <v-tab v-if="isDoctor" :to="{ name: 'CreatePost' }" class="white--text"
          >Create Post
        </v-tab>
        <v-tab
          v-if="isAdmin"
          :to="{ name: 'AdminDashBoard' }"
          class="white--text"
        >
          Dashboard
        </v-tab>
      </v-tabs>

      <ItemMenu />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" bottom fixed temporary>
      <v-list dense nav>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <!--    Guest      -->
          <v-list-item v-if="!isDoctor && !isAdmin && isCustomer">
            <v-list-item-title>
              <RegisterDoctorButton />
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isAuthenticated">
            <v-list-item-title>
              <v-btn :to="{ name: 'DoctorFavoriteList' }" plain text
                >Favorite Doctor
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="isAuthenticated">
            <v-list-item-title>
              <v-btn :to="{ name: 'PostFavoriteList' }" plain text
                >Favorite Post
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import ItemMenu from "@/components/TopNav/ItemMenu";
import { mapGetters, mapState } from "vuex";
import CreatePost from "@/views/Posts/Doctors/CreatePost";
import ListRegisterDoctorRole from "@/components/Admin/User/Doctor/ListRegisterDoctorRole";
import RegisterDoctorButton from "@/components/User/Register/RegisterDoctorButton";

export default {
  name: "TopNav",
  components: {
    ItemMenu,
    CreatePost,
    ListRegisterDoctorRole,
    RegisterDoctorButton,
  },
  computed: {
    ...mapState("AUTH", ["isAuthenticated"]),
    ...mapGetters("AUTH", ["isCustomer", "isDoctor", "isAdmin"]),
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
};
</script>

<style scoped></style>
