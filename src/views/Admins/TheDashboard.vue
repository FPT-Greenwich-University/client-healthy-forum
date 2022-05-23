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

            <!--      Category      -->
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
                    <v-list-item-title>Category</v-list-item-title>
                  </v-list-item-content>
                </template>

                <!--      Create category          -->
                <v-list-item
                    link
                    @click="isCurrentTabComponent = 'CreateCategory'"
                >
                  <v-list-item-title>Create</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-plus-outline</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <!--      Update category        -->
                <v-list-item
                    link
                    @click="isCurrentTabComponent = 'UpdateCategory'"
                >
                  <v-list-item-title>Update</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-update</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <!--     Delete category        -->
                <v-list-item
                    link
                    @click="isCurrentTabComponent = 'DeleteCategory'"
                >
                  <v-list-item-title>Delete</v-list-item-title>
                  <v-list-item-icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>


              <!--      Post        -->
              <v-list-group
                  :value="true"
                  no-action
                  sub-group
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>Post</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                    link
                    @click="isCurrentTabComponent = 'Posts'"
                >
                  <v-list-item-title>Read</v-list-item-title>

                  <v-list-item-icon>
                    <v-icon>
                      mdi-file-outline
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>

              <!--      Users        -->
              <v-list-group
                  :value="true"
                  no-action
                  sub-group
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>User</v-list-item-title>
                  </v-list-item-content>
                </template>

                <v-list-item
                    link
                    @click="isCurrentTabComponent = 'ListRegisterDoctorRole'"
                >
                  <v-list-item-title>Doctor request</v-list-item-title>

                  <v-list-item-icon>
                    <v-icon>
                      fas fa-hospital-user
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-list-item
                    link
                    @click="isCurrentTabComponent = 'ListUsers'"
                >
                  <v-list-item-title>List Users</v-list-item-title>

                  <v-list-item-icon>
                    <v-icon>
                      fas fa-user
                    </v-icon>
                  </v-list-item-icon>
                </v-list-item>

              </v-list-group>

            </v-list-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col class="col-12 col-md-9 col-lg-9 col-xl-9 col">
        <keep-alive>
          <component :is="isCurrentTabComponent"></component>
        </keep-alive>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {mapState} from "vuex";
import Posts from "@/components/Admin/Post/AdminPosts";
import CreateCategory from "@/components/Admin/Category/CreateCategory";
import UpdateCategory from "@/components/Admin/Category/UpdateCategory";
import DeleteCategory from "@/components/Admin/Category/DeleteCategory";
import ListRegisterDoctorRole from "@/components/Admin/User/Doctor/ListRegisterDoctorRole";
import ListUsers from "@/components/Admin/User/ListUsers";
export default {
  name: "TheDashboard",
  components: {
    Posts,
    CreateCategory,
    UpdateCategory,
    DeleteCategory,
    ListRegisterDoctorRole,
    ListUsers,
  },
  computed: {
    ...mapState('AUTH', ['userAuthenticated'])
  },
  data() {
    return {
      isCurrentTabComponent: "Posts", // Default component render
    }
  },
  methods: {}

}
</script>