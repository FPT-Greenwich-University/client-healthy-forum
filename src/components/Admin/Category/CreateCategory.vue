<template>
  <v-card>
    <v-card-title>Create Category</v-card-title>
    <v-form ref="form" class="mx-10" lazy-validation>
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

      <v-btn class="mr-4 my-2" color="error" @click="reset"> Reset </v-btn>

      <v-btn class="mr-4 my-2" color="primary" @click="handleCreateCategory">
        Submit
      </v-btn>
    </v-form>
    <v-row>
      <v-col>
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
import {CreateNewCategory} from "@/Apis/HealthyFormWebApi";
export default {
  name: "CreateCategory",
  data() {
    return {
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
    /**
     * Reset form data
     */
    reset() {
      this.$refs.form.reset();
    },

    /**
     * Admin create new category
     */
    async handleCreateCategory() {
      try {
        const response = await CreateNewCategory(this.formData);
        console.log(response);
        
        if (response) {
          this.errors = {}; // delete all error
          this.snackbar.content = response.data;
          this.snackbar.color = "success";
          this.snackbar.status = true;
          this.formData = {};
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
  },
};
</script>
