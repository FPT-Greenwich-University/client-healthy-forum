<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="1">
          <v-img
            height="250"
            src="https://images.pexels.com/photos/2383010/pexels-photo-2383010.jpeg"
          ></v-img>
          <v-card-title class="text-body-1 text-xl-h3 text-lg-h5 text-md-h6">
            My favorite doctors
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        v-for="user in users"
        :key="user.id"
        class="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6"
      >
        <v-card elevation="1">
          <v-card-title class="text-body-1 text-xl-h3 text-lg-h5 text-md-h6">
            {{ user.name }}
          </v-card-title>
          <v-card-subtitle> Email: {{ user.email }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
              :to="{ name: 'UserProfiles', params: { userId: user.id } }"
              plain
              text
            >
              See profile
            </v-btn>

            <v-btn color="green" outlined rounded> Contract</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Paginate @change-page="fetchDoctors" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";
import Paginate from "@/components/Paginate";

export default {
  name: "ListDoctorFavorites",
  components: { Paginate },
  data() {
    return {
      users: [], // list doctor favorites
    };
  },
  watch: {
    handleFetchDoctor: {
      handler() {
        this.fetchDoctors();
      },
      immediate: true,
    },
  },
  methods: {
    async fetchDoctors(page = 1) {
      try {
        const response = await HealthyFormWebApi().get(
          `/users/favorites/doctors?page=${page}`
        );

        if (response) {
          this.users = response.data.data;
          this.$store.commit("setCurrentPage", response.data.current_page);
          this.$store.commit("setLastPage", response.data.last_page);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
