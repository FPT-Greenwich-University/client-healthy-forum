<template>
  <v-card>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>
              <v-btn small>
                <DetailUser :userId="item.id" />
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <Paginate v-if="isNotEmptyUsers" @change-page="fetchListUsers" />
    <v-card-subtitle v-else>No records</v-card-subtitle>
  </v-card>
</template>
<script>
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";
import Paginate from "@/components/Paginate";
import DetailUser from "@/components/Admin/User/DetailUser";
import { mapGetters } from "vuex";

export default {
  name: "ListUsers",
  components: { Paginate, DetailUser },
  computed: {
    ...mapGetters("AUTH", ["isAdmin"]),

    isNotEmptyUsers() {
      return this.users.length > 0;
    },
  },
  watch: {
    handleFetchListUsers: {
      handler() {
        this.fetchListUsers();
      },

      immediate: true,
    },
  },
  data() {
    return {
      users: [],
      roleID: 3,
    };
  },
  methods: {
    async fetchListUsers(page = 1) {
      if (this.isAdmin) {
        try {
          const res = await HealthyFormWebApi().get(
            `/admins/users/?page=${page}&role_id=${this.roleID}`
          );
          this.users = res.data.data;
          this.$store.commit("setCurrentPage", res.data.current_page);
          this.$store.commit("setLastPage", res.data.last_page);
        } catch (e) {
          if (e) {
            console.log(e);
          }
        }
      }
    },
  },
};
</script>
