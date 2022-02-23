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
                  label="E-mail"
              ></v-text-field>
              <v-text-field
                  label="Password"
              ></v-text-field>
            </v-form>

            <div class="d-flex flex-column justify-center align-content-space-between">
              <!--  Normal login-->
              <v-btn
                  color="light-green darken-1 mb-3"
                  elevation="10"
                  rounded
              >Login
              </v-btn>

              <!--  Google login button -->
              <v-btn
                  class="mb-3"
                  color="white"
                  elevation="10"
                  rounded
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
                Register
              </v-btn>
            </div>

          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {}
  },
}
</script>
<style></style>