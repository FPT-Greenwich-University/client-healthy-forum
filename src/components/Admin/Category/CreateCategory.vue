<template>
  <v-card>
    <v-form
        ref="form"
        class="mx-10"
        lazy-validation
    >
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
  name: 'CreateCategory',
  data() {
    return {
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
    async handleCreateCategory() {
      try {
        const res = await Api().post('/admins/categories', this.formData)

        if (res) {
          this.errors = {} // delete all error
          this.snackbar.content = res.data
          this.snackbar.color = 'success'
          this.snackbar.status = true
          this.formData = {}

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
    }
  }
}
</script>