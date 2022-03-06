<template>
  <div class="text-center">
    <v-menu offset-y transition="slide-x-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
        >
          Menu
        </v-btn>
      </template>
      <template v-if="isAuthenticated === false">
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn block plain text>
                <router-link :to="{name: 'Login'}">Login</router-link>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
      <template v-else>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-btn block plain text>
                <router-link :to="{name: 'UserProfiles'}">
                  View Profile
                </router-link>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <!-- Logout -->
        <v-list>
          <v-list-item
          >
            <v-list-item-title>
              <Logout/>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
    </v-menu>
  </div>
</template>
<script>
import Logout from "@/components/Auth/Logout";
import {mapState} from "vuex";

export default {
  name: "ItemMenu",
  computed: {
    ...mapState("AUTH", ["isAuthenticated"]),
  },
  components: {
    Logout,
  },

  watch: {
    isLogged: {
      handler() {
        if (localStorage.getItem('token')) {
          this.$store.commit('AUTH/UPDATE_AUTH', true)
        } else {
          this.$store.commit('AUTH/UPDATE_AUTH', false)
        }
      },
      immediate: true
    }
  },
}
</script>