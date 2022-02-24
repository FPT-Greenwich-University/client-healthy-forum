<template>
  <v-container>
    <v-row
        align="center"
        class="mt-16"
        no-gutters
        style="height: 150px;"
    >
      <v-col></v-col>
      <v-col
          class="col-12 col-xl-5 col-lg-5 col-md-12 col-sm-12"
      >
        <v-card
            class="pa-5"
            shaped
        >
          <v-form>
            <!--Email-->
            <v-text-field
                v-model="formRegister.email"
                label="E-mail"
            ></v-text-field>

            <!--User name-->
            <v-text-field
                v-model="formRegister.name"
                label="Your name"
            ></v-text-field>

            <!-- Password-->
            <v-text-field
                v-model="formRegister.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                counter
                hint="At least 8 characters"
                label="Password"
                name="input-10-1"
                @click:append="show1 = !show1"
            ></v-text-field>

            <!-- Password confirm-->
            <v-text-field
                v-model="formRegister.password_confirmation"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                counter
                hint="At least 8 characters"
                label="Password confirm"
                name="input-10-1"
                @click:append="show1 = !show1"
            ></v-text-field>
          </v-form>
          <div class="text-center">
            <v-btn
                class="white--text"
                color="light-green darken-1 mb-3"
                elevation="10"
                rounded
                @click="handleRegister"
            >
              Register now
            </v-btn>
          </div>
          <v-alert
              v-show="isSuccess"
              outlined
              prominent
              shaped
              text
              type="success"
          >
            Register successful. Click
            <router-link :to="{name: 'Login'}">here</router-link>
            to return login page
          </v-alert>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>
<script>
import Api from "@/Apis/Api";

const initState = {name: '', email: '', password: '', password_confirmation: ''}

export default {
  name: "Register",

  data() {
    return {
      formRegister: {
        ...initState
      },

      error: {},
      isSuccess: false,
      show1: false,
    }
  },

  methods: {
    async handleRegister() {
      try {
        const res = await Api().post('/register', this.formRegister)
        console.log(res.data)
        this.isSuccess = true
        this.formRegister = {...initState}
      } catch (e) {
        console.log(e.response.data)
      }
    }
  }
}
</script>