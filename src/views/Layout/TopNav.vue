<template>
  <div>
    <v-app-bar app color="white1" flat tile>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-tabs center-active centered>
        <v-tab class="black--text" to="/">
          <v-btn icon>
            <v-icon color="black">mdi-home</v-icon>
          </v-btn>
        </v-tab>

        <!--    Notification    -->
        <v-tab class="black--text" v-if="isAuthenticated">
          <v-btn icon :to="{ name: 'Notification' }">
            <v-icon @click="resetColor" :color="notificationColor">
              mdi-bell
            </v-icon>
          </v-btn>
        </v-tab>

        <v-tab :to="{ name: 'Posts' }" class="black--text">
          <v-btn icon>
            <v-icon color="black">mdi-book-open</v-icon>
          </v-btn>
        </v-tab>

        <v-tab :to="{ name: 'Search' }" class="black--text">
          <v-btn icon>
            <v-icon color="black">mdi-magnify</v-icon>
          </v-btn>
        </v-tab>

        <v-tab
            v-if="isAuthenticated"
            target="_blank"
            :to="{ name: 'CometVideoCall' }"
            class="black--text"
        >
          <v-btn icon>
            <v-icon color="black">mdi-message</v-icon>
          </v-btn>
        </v-tab>

        <v-tab v-if="isDoctor" :to="{ name: 'CreatePost' }" class="black--text">
          <v-btn icon>
            <v-icon color="black">mdi-pencil</v-icon>
          </v-btn>
        </v-tab>
        <v-tab
            v-if="isAdmin"
            :to="{ name: 'AdminDashBoard' }"
            class="black--text"
            target="_blank"
        >
          Dashboard
        </v-tab>

        <v-tab :to="{ name: 'About' }" class="black--text">About</v-tab>
      </v-tabs>

      <ItemMenu/>
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
              <RegisterDoctorButton/>
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
import {mapGetters, mapState} from "vuex";
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

  created() {
    if (this.isAuthenticated) {
      Echo.private(`posts.notification`).listen("NewPostNotification", (e) => {
        this.notificationColor = "red";
      });
    }
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
      notificationColor: "black",
    };
  },
  methods: {
    resetColor() {
      this.notificationColor = "black";
    },
  },
};
</script>

<style scoped></style>