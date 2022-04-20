<template>
  <section>
    <section>
      <v-container>
        <v-row class="mt-16">
          <v-spacer/>
          <v-col class="col-12 col-xl-5 col-lg-6 col-md-8 col-sm-10">
            <v-card
                elevation="1"
                v-show="!isSuccess"
                class="pa-5"
            >
              <v-form>
                <v-text-field
                    v-model="formData.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    counter
                    hint="At least 8 characters"
                    label="Password"
                    name="input-10-1"
                    @click:append="showPassword = !showPassword"
                ></v-text-field>
                <span v-if="Object.keys(invalidInput).length !== 0"
                      class="red--text">{{ invalidInput.password[0] }}</span>
                <v-text-field
                    v-model="formData.password_confirmation"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    counter
                    hint="At least 8 characters"
                    label="Password Confirm"
                    name="input-10-1"
                    @click:append="showPassword = !showPassword"
                ></v-text-field>
                <div/>
                <v-btn
                    class="mt-2"
                    color="green lighten-1"
                    rounded
                    @click="handleResetPassword"
                >Reset password
                </v-btn>
              </v-form>
            </v-card>

            <!--          Alert if success-->
            <v-alert
                v-show="isSuccess"
                border="left"
                class="mt-5"
                color="green"
                type="success"
            >
              Reset password success!, you will redirect back to login after 3 seconds.
            </v-alert>
          </v-col>
          <v-spacer/>
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script>
import Api from "@/Apis/Api";

const initFormData = {password: '', password_confirmation: ''}
export default {
  name: "ResetPassword",
  data() {
    return {
      formData: {
        ...initFormData
      },
      token: this.$route.query.token,
      invalidInput: {},
      isSuccess: false,
      showPassword: false,
    }
  },
  methods: {
    async handleResetPassword() {
      let formResetPassword = {
        ...this.formData,
        token: this.token
      }
      try {
        const response = await Api().put('/reset-password', formResetPassword)
        console.log(response.data)
        if (response) {
          this.isSuccess = true
          this.backLogin()
        }
      } catch (error) {
        console.log(error.response.data)
        if (error.response.status === 422) {
          this.invalidInput = error.response.data
        }
      }
    },
    backLogin() {
      setTimeout(() => {
        this.$router.replace({name: 'Home'})
      }, 3000)
    }
  }
  ,
}
</script>