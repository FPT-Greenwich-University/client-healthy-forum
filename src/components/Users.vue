<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left blue">Email</th>
          <th class="text-left blue">Name</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.email }}</td>
          <td>{{ user.name }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- Paginate -->
    <Paginate @change-page="handleGetUsers"/>
  </v-container>
</template>

<script>
// Components
import Paginate from "./Paginate.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "Users",
  computed: {
    ...mapState(["users"]),
  },
  components: {
    Paginate,
  },
  created() {
    this.handleGetUsers(3);
  },

  data() {
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    handleGetUsers(page) {
      this.fetchUsers(page);
    },
  },
};
</script>

<style lang="scss" scoped></style>
