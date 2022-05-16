<template>
  <div class="text-center">
    <v-menu offset-y transition="slide-x-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            color="primary"
            v-on="on"
            icon
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <template v-if="isAuthenticated === false">
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-tab :to="{name: 'Login'}" block plain text>
                Login
              </v-tab>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
      <template v-else>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <v-tab :to="{name: 'UserProfiles', params:{userID: userAuthenticated.id}}" block plain text>
                Profile
              </v-tab>
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
    ...mapState("AUTH", ["isAuthenticated", "userAuthenticated"]),
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