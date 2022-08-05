<template>
  <v-card>
    <v-form ref="formData" class="mx-10">
      <!-- Select Category-->
      <v-select
        v-model="categoryId"
        :items="categories"
        chips
        hint="Pick the category to delete"
        item-text="name"
        item-value="id"
        label="Select Category"
      ></v-select>
      <div v-if="errors.category" class="red--text">{{ errors.category }}</div>

      <v-checkbox v-model="checkbox" label="Do you agree?"></v-checkbox>

      <!--  Action delete    -->
      <v-btn
        :disabled="invalid"
        class="mr-4 my-2"
        color="red"
        outlined
        @click="handleDeleteCategory"
      >
        Delete
        <v-icon right> mdi-delete</v-icon>
      </v-btn>

      <v-btn class="mr-4 my-2" color="#66bb6a" outlined @click="resetForm">
        Reset
        <v-icon> mdi-update</v-icon>
      </v-btn>
    </v-form>

    <!--Snack bar-->
    <v-row>
      <v-col>
        <!-- Error -->
        <v-snackbar
          v-model="snackbar.status"
          :color="snackbar.color"
          :timeout="snackbar.timeout"
        >
          {{ snackbar.content }}
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar.status = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { GetCategories } from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";
import { DeleteCategory } from "@/Apis/HealthyFormWebApi/AdminApi/AdminApi";

export default {
  name: "DeleteCategory",
  computed: {
    invalid() {
      return this.checkbox === false;
    },
  },
  watch: {
    handleFetchCategories: {
      handler() {
        this.fetchCategories();
      },

      immediate: true,
    },
  },

  data() {
    return {
      categories: [],
      categoryId: null,
      errors: {},
      snackbar: {
        status: false,
        color: "",
        content: "",
        timeout: 3000,
      },
      checkbox: false,
    };
  },

  methods: {
    /**
     * Reset form input
     */
    resetForm() {
      this.$refs.formData.reset();
      this.checkbox = false;
    },

    /**
     * Check if the category id is null
     */
    checkIsNullcategoryId() {
      return this.categoryId === null;
    },

    async handleDeleteCategory() {
      try {
        if (this.checkIsNullcategoryId() !== true) {
          const res = await DeleteCategory(this.categoryId);

          if (res.status === 204) {
            this.errors = {}; // remove all errors
            this.snackbar = {
              content: "Delete Success",
              status: true,
              color: "success",
            };
            this.checkbox = false;
            this.categoryId = null;
            await this.fetchCategories();
          }
        } else {
          this.snackbar = {
            color: "red",
            content: "Please choose category want to delete",
            status: true,
          };
          this.errors = {
            ...this.errors,
            category: "The category is required!",
          };
        }
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    },

    /**
     * Fetch all the categories
     */
    async fetchCategories() {
      try {
        const response = await GetCategories();

        this.categories = response.data.map((e) => {
          return {
            id: e.id,
            name: e.name,
          };
        });
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>
