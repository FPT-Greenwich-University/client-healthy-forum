<template>
  <v-card>
    <v-form
        ref="form"
        class="mx-10"
    >
      <!-- Select Category-->
      <v-select
          v-model="categoryID"
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
      <template v-if="errors.description"><p class="red--text">{{ errors.name[0] }}</p></template>

      <v-text-field
          v-model="formData.description"
          :counter="100"
          label="Description"
          required
      ></v-text-field>
      <template v-if="errors.description"><p class="red--text">{{ errors.description[0] }}</p></template>

      <v-btn
          class="mr-4 my-2"
          color="error"
          @click="reset"
      >
        Reset Form
      </v-btn>

      <v-btn
          class="mr-4 my-2"
          color="primary"
          @click="handleCreateCategory"
      >
        Submit
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
            <v-btn
                text
                v-bind="attrs"
                @click="snackbar.status = false"
            >
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
  name: 'UpdateCategory',
  watch: {
    handleFetchCategories: {
      handler() {
        this.fetchCategories()
      },

      immediate: true
    }
  },
  data() {
    return {
      categories: [],
      categoryID: null,
      formData: {
        name: '',
        description: '',
      },
      errors: {},
      snackbar: {
        status: false,
        color: '',
        content: '',
        timeout: 3000,
      },
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },

    checkIsNullCategoryID() {
      return this.categoryID == null;
    },

    async handleCreateCategory() {
      try {
        if (this.checkIsNullCategoryID() !== true) {
          const res = await Api().put(`/admins/categories/${this.categoryID}`, this.formData)
          console.log('Update category', res)
          if (res) {
            this.errors = {} // delete all error
            this.snackbar.content = res.data
            this.snackbar.color = 'success'
            this.snackbar.status = true
            this.formData = {}
            this.categoryID = null
          }
        } else {
          this.snackbar.color = 'red'
          this.snackbar.content = 'Please choose category want to update'
          this.snackbar.status = true
          this.errors = {...this.errors, category: 'The category is required!'}
        }
      } catch (e) {
        if (e) {
          if (e.response.status === 422) {
            this.errors = e.response.data
            this.snackbar.color = 'red'
            this.snackbar.content = 'Failed to update the post'
            this.snackbar.status = true
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
        const res = await Api().get('/categories')
        this.categories = res.data.map(e => {
          return {
            id: e.id,
            name: e.name
          }
        })
      } catch (e) {
        if (e) {
          console.log(e)
        }
      }
    },
  }
}
</script>