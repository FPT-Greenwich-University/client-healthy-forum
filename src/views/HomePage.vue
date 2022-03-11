<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color="white"
        flat
    >
      <v-avatar
          :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
          size="32"
      >
        <template v-if="userInfo">
          <img :src="userInfo.image_url"/>
        </template>
      </v-avatar>

      <v-tabs
          centered
          class="ml-n9"
          color="grey darken-1"
      >
        <v-tab
            v-for="link in links"
            :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-avatar
          class="hidden-sm-and-down"
          color="grey darken-1 shrink"
          size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
              cols="12"
              sm="2"
          >
            <v-sheet
                min-height="268"
                rounded="lg"
            >
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col
              cols="12"
              sm="8"
          >
            <v-sheet
                min-height="70vh"
                rounded="lg"
            >
              <!--  -->
            </v-sheet>
          </v-col>

          <v-col
              cols="12"
              sm="2"
          >
            <v-sheet
                min-height="268"
                rounded="lg"
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "HomePage",
  computed: {
    ...mapState("AUTH", ["userInfo"]),
  },
  created() {
    this.fetchProfile()
  },
  methods: {
    ...mapActions("AUTH", ["fetchProfile"])
  },
  data: () => ({
    links: [
      'Dashboard',
      'Messages',
      'Profile',
      'Updates',
    ],
  }),
}
</script>