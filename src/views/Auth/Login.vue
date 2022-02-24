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
        <!-- Demo-->
        <v-col>
          <div v-if="isLogin">User login success
            <button @click="logoutGoogle">Logout</button>
          </div>

          <div>{{ userName }}</div>
          <template v-if="error">
            {{ error.email }}
            {{ error.password }}
          </template>
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
      // console.log("googleUser", googleUser);
      // console.log("getId", googleUser.getId());
      const demo = googleUser.getBasicProfile();
      console.log(demo);
      this.email = demo.tv;
      this.userName = demo.tf;
      // console.log("getAuthResponse", googleUser.getAuthResponse());
      // console.log(
      //   "getAuthResponse$G",
      //   this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
      // );
      this.isLogin = this.$gAuth.isAuthorized;
      let formData = {
        email: this.email,
        name: this.userName,
      }
      await this.loginBackend(formData);
      await this.$router.push({name: "Home"})
    },

    async loginBackend(formData) {
      try {
        const res = await Api().post('/login/google', formData)
        localStorage.setItem('token', res.data.token);
      } catch (e) {
        console.log('Backend login error', e)
      }
    },

    async logoutGoogle() {
      const response = await this.$gAuth.signOut()
      this.isLogin = false
      this.email = ''
      this.userName = ''
      await this.logoutBackend()
    },


    async logoutBackend() {
      try {
        const res = await Api().post('/logout/google')
        console.log('res backend', res)
        localStorage.removeItem('token')
        this.isLogin = true
      } catch (e) {
        console.log('Backend login error', e)
      }
    },

    // Api login
    async apiLogin() {
      let formData = new FormData()
      formData.append('email', this.email)
      formData.append('password', this.password)

      try {
        const res = await Api().post('/login', formData)
        console.log(res.data)
        localStorage.setItem('token', res.data.token);
        await this.$router.push({name: "Home"})
      } catch (e) {
        console.log(e.response.data)
        this.error = e.response.data
      }
    }
  },


}
</script>
<style></style>