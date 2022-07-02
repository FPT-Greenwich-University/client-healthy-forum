<template>

</template>

<script>
import {
  FilterPosts,
  GetCategories,
} from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";

export default {
  name: "TheFilterPosts",
  watch: {
    handleGetCategories: {
      handler() {
        this.fetchCategories();
      },
      immediate: true,
    },
    categoryId(newValue, oldValue) {
    },
  },
  data() {
    return {
      categories: [],
      sortBy: ["Recently Added", "Name", "Most Like", "Most View"],
      categoryId: null,
      sort: null,
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await GetCategories();

        if (response) {
          this.categories = response.data;
        }
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    },

    resetFilter() {
      this.categoryId = null;
    },
  },
};
</script>

<style scoped></style>