<template>
  <v-card>
    <v-form ref="formData" class="mx-10">
      <!-- Select Category-->
      <v-select
        v-model="categoryID"
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
        <v-icon right> mdi-delete </v-icon>
      </v-btn>

      <v-btn class="mr-4 my-2" color="#66bb6a" outlined @click="resetForm">
        Reset
        <v-icon> mdi-update </v-icon>
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
import Api from "@/Apis/Api";

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
      categoryID: null,
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
    resetForm() {
      this.$refs.formData.reset();
      this.checkbox = false;
    },
    /**
     * Check if the category id is null
     *
     * @returns {boolean} true if categoryID is null, otherwise false
     */
    checkIsNullCategoryID() {
      return this.categoryID == null;
    },

    async handleDeleteCategory() {
      try {
        if (this.checkIsNullCategoryID() !== true) {
          const res = await Api().delete(
            `/admins/categories/${this.categoryID}`
          );
          if (res) {
            this.errors = {}; // delete all error
            this.snackbar = {
              content: res.data,
              status: true,
              color: "success",
            };
            this.checkbox = false;
            this.categoryID = null;
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
          if (e.response.status === 405) {
            this.snackbar = {
              color: "red",
              status: true,
              content: "The category have used by the posts, can't not remove!",
            };
          }
        }
      }
    },

    /**
     * Fetch all the categories
     * @returns {Promise<void>}
     */
    async fetchCategories() {
      try {
        const res = await Api().get("/categories");
        this.categories = res.data.map((e) => {
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
