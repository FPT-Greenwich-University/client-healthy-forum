<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left blue">Author</th>
            <th class="text-left blue">Book</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.author }}</td>
            <td>{{ book.name }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- Paginate -->
    <Paginate :totalPage="totalPage" @change-page="handleGetbooks" />
  </v-container>
</template>

<script>
// Components
import Paginate from "./Paginate.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "Books",
  computed: {
    ...mapState(["books"]),
  },
  components: {
    Paginate,
  },
  created() {
    this.handleGetbooks(3);
  },

  data() {
    return {
      totalPage: 0,
    };
  },
  methods: {
    ...mapActions(["fetchbooks"]),
    handleGetbooks(page) {
      this.fetchbooks(page);
    },
  },
};
</script>

<style lang="scss" scoped></style>
