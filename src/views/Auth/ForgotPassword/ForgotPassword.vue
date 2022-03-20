<template>
  <section>
    <v-container>
      <v-row class="mt-16">
        <v-spacer/>
        <v-col class="col-12 col-xl-5 col-lg-6 col-md-8 col-sm-10">
          <v-card
              :loading="isLoading"
              class="pa-5"
          >
            <v-form>
              <v-text-field v-model="email" label="Email" placeholder="Enter your email want to reset new password"/>
              <v-btn
                  color="green lighten-1"
                  rounded
                  @click="sendMailResetPassword"
              >Submit
              </v-btn>
            </v-form>
          </v-card>
          <!--          Alert if success-->
          <v-alert
              v-show="isSuccess"
              border="left"
              class="mt-5"
              color="green"
              dismissible
              type="success"
          >
            We have send email reset password to your email, please check it!
          </v-alert>

          <!--          Alert if error-->
          <v-alert
              v-if="Object.keys(error).length !== 0"
              border="left"
              class="mt-5"
              color="red"
              dismissible
              type="error"
          >
            {{ error.email[0] }}
          </v-alert>

          <!--          Error if email not found-->
          <v-alert
              v-if="notFoundError.length !== 0"
              border="left"
              class="mt-5"
              color="red"
              dismissible
              type="error"
          >
            {{ notFoundError }}
          </v-alert>
        </v-col>
        <v-spacer/>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import Api from "@/Apis/Api";

export default {
  name: "ForgotPassword",
  data() {
    return {
      email: '',
      isLoading: false,
      isSuccess: false,
      error: {},
      notFoundError: '',
    }
  },
  methods: {
    async sendMailResetPassword() {
      this.isLoading = true
      let formData = new FormData()
      formData.append('email', this.email)
      try {
        const response = await Api().post('/forgot-password', formData)
        if (response) {
          this.isLoading = false
          this.isSuccess = true
        }
      } catch (error) {
        this.isLoading = false
        console.log(error.response.data)
        // Invalid request
        if (error.response.status === 422) {
          this.error = await error.response.data

        }
        //Email not found
        if (error.response.status === 404) {
          this.notFoundError = error.response.data
        }
      }
    },
  },
}
</script>