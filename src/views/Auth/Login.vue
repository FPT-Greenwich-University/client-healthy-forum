<template>
  <section class="Login">
    <v-container>
      <v-row
          align="center"
          class="mt-16"
          no-gutters
          style="height: 150px;"
      >
        <v-col/>
        <v-col
            class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10"
        >
          <v-card
              class="pa-5"
              elevation="1"
          >
            <v-form>
              <v-text-field
                  v-model="email"
                  counter
                  label="E-mail"
              ></v-text-field>
              <small v-if="error.email" class="red--text">{{ error.email[0] }}</small>
              <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  counter
                  label="Password"
                  @click:append="show1 = !show1"
              ></v-text-field>
              <small v-if="error.password" class="red--text">{{ error.password[0] }}</small>
            </v-form>

            <div class="d-flex flex-column justify-center align-content-space-between">
              <!--  Normal login-->
              <v-btn
                  color="light-green darken-1 mb-3"
                  rounded
                  @click="apiLogin"
              >Login
              </v-btn>

              <!--  Google login button -->
              <v-btn
                  class="mb-3"
                  color="white"
                  rounded
                  @click="googleLogin"
              >
                <v-img
                    class="rounded mr-1"
                    lazy-src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"
                    max-height="20"
                    max-width="20"
                    src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"
                ></v-img>
                Google Sign-in
              </v-btn>

              <!-- REGISTER AND FORGOT PASSWORD-->
              <v-row>
                <v-col>
                  <!-- Register route-->
                  <router-link :to="{name:'Register'}">
                    <v-btn
                        rounded
                        text
                    >
                      Register
                    </v-btn>
                  </router-link>
                </v-col>
                <v-spacer/>
                <v-col>
                  <!-- Forgot password route-->
                  <router-link :to="{name:'ForgotPassword'}">
                    <v-btn
                        rounded
                        text
                    >
                      Forgot password
                    </v-btn>
                  </router-link>
                </v-col>
              </v-row>
            </div>
            <!-- If user login fail with wrong email or password-->
            <v-alert
                v-if="errorStatus === 401"
                border="left"
                class="ma-2"
                dense
                elevation="0"
                outlined
                type="error"
            >
              {{ error }}
            </v-alert>

            <!-- If user are not verify email-->
            <v-alert
                v-if="errorStatus === 403"
                border="left"
                dense
                type="warning"
            >
              We have already send link verify this account to your email.
              <v-btn @click="verifyAccount">Resend link</v-btn>
            </v-alert>
          </v-card>
        </v-col>
        <v-col/>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import Api from "@/Apis/Api";
import {mapActions} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      isLogin: false,
      email: "",
      idToken: "",
      password: "",
      userName: "",
      imageUrl: "",
      error: {},
      errorStatus: 0,
      show1: false,
    };
  },
  methods: {
    ...mapActions('AUTH', ['fetchUserAuthInfo']),

    async googleLogin() {
      try {
        const googleUser = await this.$gAuth.signIn()
        const profile = googleUser.getBasicProfile();
        this.idToken = googleUser.getAuthResponse().id_token
        this.email = profile.getEmail();
        this.userName = profile.getName();
        this.imageUrl = profile.getImageUrl();
        // console.log('image url', this.imageUrl)
        this.isLogin = this.$gAuth.isAuthorized;
        let formData = {
          email: this.email,
          name: this.userName,
          image_url: this.imageUrl,
          provider_id: this.idToken
        }

        // console.log('form', formData)
        await this.loginBackend(formData);
        this.$store.commit('AUTH/UPDATE_AUTH', true)
        let previousUrl = this.$router.history._startLocation

        if (previousUrl !== '/login') {
          await this.$router.replace({path: previousUrl})
        } else {
          await this.$router.replace({path: '/'})
        }
      } catch (error) {
        console.log(error)
      }
    },

    // Login to backend with Google information
    async loginBackend(formData) {
      try {
        const res = await Api().post('/login/google', formData)
        // console.log('res data google log', res)
        localStorage.setItem('token', res.data.token);
        await this.fetchUserAuthInfo()
      } catch (e) {
        console.log('Backend login error', e)
      }
    },


    // Normal Api login  with sanctum token
    async apiLogin() {
      let formData = new FormData()
      formData.append('email', this.email)
      formData.append('password', this.password)

      try {
        const res = await Api().post('/login', formData)
        // console.log(res.data)
        localStorage.setItem('token', res.data.token);
        this.$store.commit('AUTH/UPDATE_AUTH', true)
        await this.fetchUserAuthInfo()
        let previousUrl = this.$router.history._startLocation

        if (previousUrl !== '/login') {
          await this.$router.replace({path: previousUrl})
        } else {
          await this.$router.replace({path: '/'})
        }
      } catch (e) {
        if (e.response.status === 401) {
          this.errorStatus = 401
          this.error = e.response.data
        }

        if (e.response.status === 422) {
          this.error = e.response.data
        }
        // if user is not verify account
        if (e.response.status === 403) {
          this.errorStatus = 403;
          await this.verifyAccount()
        }
      }
    },

    async verifyAccount() {
      try {
        await Api().post('/email/verification-notification', {email: this.email})
      } catch (e) {
        console.log('Error send link', e)
      }
    },
  },
}
</script>