<template>
  <v-card>
    <v-card-title>Update Category</v-card-title>
    <v-form ref="form" class="mx-10">
      <!-- Select Category-->
      <v-select
        v-model="categoryId"
        :items="categories"
        chips
        hint="Pick the category to update"
        item-text="name"
        item-value="id"
        label="Select Category"
      ></v-select>
      <div v-if="errors.category" class="red--text">{{ errors.category }}</div>

      <v-text-field
        v-model="formData.name"
        :counter="100"
        label="Name"
        required
      ></v-text-field>
      <template v-if="errors.description"
        ><p class="red--text">{{ errors.name[0] }}</p></template
      >

      <v-text-field
        v-model="formData.description"
        :counter="100"
        label="Description"
        required
      ></v-text-field>
      <template v-if="errors.description"
        ><p class="red--text">{{ errors.description[0] }}</p></template
      >

      <v-btn
        rounded
        class="mr-4 my-2 white--text"
        color="blackBrown"
        @click="reset"
      >
        Reset
        <v-icon> mdi-update</v-icon>
      </v-btn>

      <v-btn
        rounded
        class="mr-4 my-2"
        color="white1"
        @click="handleCreateCategory"
      >
        Submit
        <v-icon> fas fa-paper-plane</v-icon>
      </v-btn>
    </v-form>
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
import { UpdateCategory } from "@/Apis/HealthyFormWebApi/AdminApi/AdminApi";

export default {
  name: "UpdateCategory",
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
      formData: {
        name: "",
        description: "",
      },
      errors: {},
      snackbar: {
        status: false,
        color: "",
        content: "",
        timeout: 3000,
      },
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },

    checkIsNullcategoryId() {
      return this.categoryId == null;
    },

    async handleCreateCategory() {
      try {
        if (this.checkIsNullcategoryId() !== true) {
          const response = await UpdateCategory(this.categoryId, this.formData);

          if (response.status === 204) {
            this.errors = {}; // remove all error
            this.snackbar.content = "Update success";
            this.snackbar.color = "success";
            this.snackbar.status = true;
            this.formData = {};
            this.categoryId = null;
          }
        } else {
          this.snackbar.color = "red";
          this.snackbar.content = "Please choose category want to update";
          this.snackbar.status = true;
          this.errors = {
            ...this.errors,
            category: "The category is required!",
          };
        }
      } catch (e) {
        if (e) {
          if (e.response.status === 422) {
            this.errors = e.response.data;
            this.snackbar.color = "red";
            this.snackbar.content = "Failed to update the post";
            this.snackbar.status = true;
          }
        }
      }
    },

    /**
     * Fetch all the categories
     */
    async fetchCategories() {
      try {
        const response = await GetCategories();

        if (response.status === 200) {
          this.categories = response.data.map((e) => {
            return {
              id: e.id,
              name: e.name,
            };
          });
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
