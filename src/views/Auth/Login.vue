<template>
  <section class="Login">
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
              <v-text-field
                  v-model="email"
                  label="E-mail"
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  counter
                  hint="At least 8 characters"
                  label="Password"
                  name="input-10-1"
                  @click:append="show1 = !show1"
              ></v-text-field>
            </v-form>

            <div class="d-flex flex-column justify-center align-content-space-between">
              <!--  Normal login-->
              <v-btn
                  color="light-green darken-1 mb-3"
                  elevation="10"
                  rounded
                  @click="apiLogin"
              >Login
              </v-btn>

              <!--  Google login button -->
              <v-btn
                  class="mb-3"
                  color="white"
                  elevation="10"
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

              <!-- Register-->
              <v-btn
                  color="blue"
                  rounded
                  text
              >
                <router-link :to="{name:'Register'}">
                  Register
                </router-link>
              </v-btn>
            </div>

          </v-card>
        </v-col>
        <v-col>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import Api from "@/Apis/Api";

export default {
  name: "Login",
  data() {
    return {
      isLogin: false,
      email: "",
      password: "",
      userName: "",
      error: {},
      show1: false,
    };
  },
  methods: {
    async googleLogin() {
      const googleUser = await this.$gAuth.signIn();
      const basicProfile = googleUser.getBasicProfile();
      this.email = basicProfile.tv;
      this.userName = basicProfile.tf;
      this.isLogin = this.$gAuth.isAuthorized;
      let formData = {
        email: this.email,
        name: this.userName,
      }
      await this.loginBackend(formData);
      this.$store.commit('AUTH/UPDATE_AUTH', true)
      let previousUrl = this.$router.history._startLocation

      if (previousUrl !== '/login') {
        await this.$router.replace({path: previousUrl})
      } else {
        await this.$router.replace({path: '/'})
      }
    },

    // Login to backend with Google information
    async loginBackend(formData) {
      try {
        const res = await Api().post('/login/google', formData)
        localStorage.setItem('token', res.data.token);
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
        console.log(res.data)
        localStorage.setItem('token', res.data.token);
        this.$store.commit('AUTH/UPDATE_AUTH', true)
        let previousUrl = this.$router.history._startLocation

        if (previousUrl !== '/login') {
          await this.$router.replace({path: previousUrl})
        } else {
          await this.$router.replace({path: '/'})
        }
      } catch (e) {
        console.log(e.response.data)
        this.error = e.response.data
      }
    }
  },
}
</script>