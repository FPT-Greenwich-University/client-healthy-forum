<template>
  <v-container>
    <v-row>
      <v-col class="col-3 d-none d-md-block d-lg-block d-xl-block">
        <v-card
            elevation="1"
        >
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>

              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-group
                :value="true"
                prepend-icon="mdi-account-circle"
            >
              <template v-slot:activator>
                <v-list-item-title>{{ userAuthenticated.name }}</v-list-item-title>
              </template>

              <v-list-group
                  :value="true"
                  no-action
                  sub-group
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Admin</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                    v-for="([title, icon], i) in admins"
                    :key="i"
                    link
                >
                  <v-list-item-title v-text="title"></v-list-item-title>

                  <v-list-item-icon>
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>

              <v-list-group
                  no-action
                  sub-group
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Actions</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                    v-for="([title, icon], i) in cruds"
                    :key="i"
                    link
                >
                  <v-list-item-title v-text="title"></v-list-item-title>

                  <v-list-item-icon>
                    <v-icon v-text="icon"></v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>
            </v-list-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col class="col-12 col-md-9 col-lg-9 col-xl-9 col">
        <keep-alive>
          <component v-bind:is="isCurrentTabComponent"></component>
        </keep-alive>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {mapState} from "vuex";
import Posts from "@/components/Admin/Post/AdminPosts";

export default {
  name: "TheDashboard",
  components: {
    Posts
  },
  computed: {
    ...mapState('AUTH', ['userAuthenticated'])
  },
  data() {
    return {
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
      isCurrentTabComponent: "Posts", // Default component render
    }
  },

}
</script>