<template>
  <div class="text-center">
    <v-pagination
      v-model="currentPage"
      :length="lastPage"
      :total-visible="7"
      circle
      light
      color="greenMoodBoard2"
    ></v-pagination>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Paginate",
  watch: {
    currentPage(newValue) {
      this.handleSetCurrentPage(newValue);
    },
  },

  computed: {
    ...mapState(["lastPage"]), // get last page

    currentPage: {
      get() {
        return this.$store.state.currentPage;
      },
      set(newValue) {
        this.$store.commit("setCurrentPage", newValue);
      },
    },
  },

  data() {
    return {};
  },

  methods: {
    ...mapMutations(["setCurrentPage"]),

    handleSetCurrentPage(page) {
      this.setCurrentPage(page);
      this.$emit("change-page", page);
    },
  },
};
</script>

<style lang="scss" scoped></style>
