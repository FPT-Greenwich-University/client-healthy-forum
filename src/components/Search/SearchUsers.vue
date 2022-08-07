<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
            v-model="query"
            append-icon="mdi-magnify"
            background-color="Tanly"
            clearable
            label="Search Users"
            placeholder="Enter the user name or email"
            solo
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col
          v-for="item in users"
          :key="item.id"
          class="col-12 col-xl-6 col-lg-6 col-md-6"
      >
        <v-card elevation="0">
          <v-card-text>
            <template v-if="item.provider_id === null">
              <v-img
                  v-if="item.image"
                  :src="`${backEndURL}/${item.image.path}`"
                  aspect-ratio="2"
              ></v-img>
            </template>

            <template v-else>
              <v-img :src="item.image_url" aspect-ratio="2"></v-img>
            </template>
          </v-card-text>

          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle>{{ item.email }}</v-card-subtitle>
          <v-card-subtitle></v-card-subtitle>
          <v-card-actions>
            <v-btn
                :to="{ name: 'UserProfiles', params: { userId: item.id } }"
                class="text-decoration-underline"
                color="primary"
                depressed
                plain
                text
                tile
            >
              View Profile
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Paginate  -->
    <v-row v-if="!isEmptyUsers">
      <v-col>
        <Paginate @change-page="searchUsers"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {SearchUsers} from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";
import Paginate from "@/components/Paginate";

export default {
  name: "SearchUsers",
  components: {Paginate},
  computed: {
    isEmptyUsers() {
      return this.users.length === 0;
    },
  },
  data() {
    return {
      query: "",
      users: [],
      backEndURL: process.env.VUE_APP_BACKEND_URL,
    };
  },
  watch: {
    query: {
      handler(newValue, oldValue) {
        this.searchUsers();

        if (newValue.length === 0) {
          this.users = []; // Reset list users
        }
      },
      deep: true,
    },
  },
  methods: {
    async searchUsers(page = 1) {
      if (this.query !== "") {
        try {
          const response = await SearchUsers(this.query, page);

          if (response.status === 200) {
            this.users = response.data.data;
            this.$store.commit("setCurrentPage", response.data.current_page);
            this.$store.commit("setLastPage", response.data.last_page);
          }
        } catch (error) {
          if (error) {
            console.log("Search user", error);
          }
        }
      }
    },
  },
};
</script>

<style scoped></style>