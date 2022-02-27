<template>
  <v-app>
    <v-app-bar
        app
        color="light-green darken-1"
        dark
    >
      <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
        />

        <v-img
            alt="Vuetify Name"
            class="shrink mt-1 hidden-sm-and-down"
            contain
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
            width="100"
        />
      </div>

      <v-spacer></v-spacer>

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
          <v-list>
            <v-list-item
            >
              <v-list-item-title>Item 1</v-list-item-title>
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
        </v-menu>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
// Components
import Logout from "@/components/Auth/Logout";

export default {
  name: 'App',
  components: {
    Logout
  },

  data: () => ({
    //
  }),

};
</script>
