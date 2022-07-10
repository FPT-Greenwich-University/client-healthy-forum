<template>
  <v-card>
    <v-card-title>Doctor role request</v-card-title>
    <v-simple-table v-if="users.length > 0" dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left blue--text">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users" :key="item.id">
            <td>{{ item.user.id }}</td>
            <td>{{ item.user.email }}</td>
            <td>
              <v-btn
                color="primary"
                x-small
                @click="handleAcceptDoctorRole(item.user_id)"
              >
                Accept
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <template v-else>
      <v-card-text class="ma-4">No records</v-card-text>
    </template>
    <v-card-actions>
      <Paginate
        v-if="users.length > 0"
        @change-page="fetchListRegisterDoctor"
      />
      <v-btn color="success" outlined @click="fetchListRegisterDoctor"
        >Refresh</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";
import Paginate from "@/components/Paginate";

export default {
  name: "ListRegisterDoctorRole",
  components: { Paginate },
  data() {
    return {
      users: [],
    };
  },
  watch: {
    handleFetchListRegisterDoctor: {
      handler() {
        this.fetchListRegisterDoctor(1);
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * Fetch list user register doctor's role
     * @param page
     * @returns {Promise<void>}
     */
    async fetchListRegisterDoctor(page) {
      try {
        const res = await HealthyFormWebApi().get(
          `/register/doctor-role?page=${page}`
        );
        console.log(res);
        this.users = res.data.data;
        this.$store.commit("setCurrentPage", res.data.current_page);
        this.$store.commit("setLastPage", res.data.last_page);
      } catch (e) {
        console.log(e);
      }
    },

    async handleAcceptDoctorRole(userId) {
      try {
        const res = await HealthyFormWebApi().put(
          `/register/doctor-role/${userId}`
        );
        console.log("Accept role", res);
        if (res) {
          await this.fetchListRegisterDoctor(1);
        }
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>
