<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            v-bind="attrs"
            @click="fetchUserDetail"
            v-on="on"
        >
          Detail
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >
          <v-btn
              dark
              icon
              @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
                dark
                text
                @click="dialog = false"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
            subheader
            three-line
        >
          <v-subheader>Direct permissions</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-col>
                <v-btn
                    v-for="item in user.permissions"
                    :key="item.id"
                    class="mx-2"
                    x-small
                >
                  {{ item.name }}
                </v-btn>
              </v-col>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list-item>
          <UpdatePermission :roles="roles" :userID="userID" @fetch-user-detail="fetchUserDetail"/>
        </v-list-item>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import {mapGetters} from "vuex";
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi";
import UpdatePermission from "@/components/Admin/UpdatePermission";

export default {
  name: "DetailUser",
  components: {UpdatePermission},
  props: {
    userID: {
      type: Number,
      required: true,
    }
  },
  computed: {
    ...mapGetters('AUTH', ['isAdmin'])
  },
  data() {
    return {
      dialog: false,
      user: {},
      roles: [],
    }
  },
  methods: {
    /**
     * Fetch user detail information
     *
     * @returns {Promise<void>}
     */
    async fetchUserDetail() {
      if (this.isAdmin) {
        try {
          const res = await HealthyFormWebApi().get(`/admins/users/${this.userID}/roles`)
          if (res) {
            this.user = res.data

            if (res.data.roles) {
              this.setRoles(res.data.roles)
            }
          }
        } catch (e) {
          if (e) {
            console.log(e)
          }
        }
      }
    },

    /**
     Set array roles of current user

     * @param roles
     */
    setRoles(roles) {
      this.roles = roles.map(element => {
        return {
          id: element.id,
          name: element.name,
        }
      })
    }
  }
}
</script>