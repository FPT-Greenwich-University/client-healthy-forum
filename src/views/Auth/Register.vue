<template>
  <v-container>
    <v-row align="center" class="mt-16" no-gutters style="height: 150px">
      <v-col></v-col>
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-12 col-sm-12">
        <v-card class="pa-5">
          <v-form>
            <!--Email-->
            <v-text-field
              v-model="formRegister.email"
              label="E-mail"
            ></v-text-field>
            <small v-if="errorResponse.email" class="red--text">{{
              errorResponse.email[0]
            }}</small>

            <!--User name-->
            <v-text-field
              v-model="formRegister.name"
              label="Your name"
            ></v-text-field>
            <small v-if="errorResponse.name" class="red--text">{{
              errorResponse.name[0]
            }}</small>

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
            <small v-if="errorResponse.password" class="red--text">{{
              errorResponse.password[0]
            }}</small>

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
              rounded
              @click="handleRegister"
            >
              Register now
            </v-btn>
          </div>

          <!-- Show link redirect to login form if register success-->
          <v-alert
            v-show="isSuccess"
            outlined
            prominent
            shaped
            text
            type="success"
          >
            Register successful. Click
            <router-link :to="{ name: 'Login' }">here</router-link>
            to return login page. The browser also auto redirect to login page
            after 5 seconds.
          </v-alert>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>
<script>
import { Register } from "@/Apis/HealthyFormWebApi/AuthApi/AuthApi";

const initState = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export default {
  name: "Register",

  data() {
    return {
      formRegister: {
        ...initState,
      },

      errorResponse: {},
      isSuccess: false,
      show1: false,
    };
  },

  methods: {
    async handleRegister() {
      try {
        await Register(this.formRegister);

        this.isSuccess = true;
        this.errorResponse = {};
        this.formRegister = { ...initState }; // reset state form register

        setTimeout(() => {
          this.$router.push({ name: "Login" });
        }, 5000);
      } catch (error) {
        if (error.response.status === 422) {
          this.errorResponse = error.response.data;
        }
      }
    },
  },
};
</script>
