<template>
  <v-container>
    <v-row>
      <v-spacer/>
      <v-col class="col-12 col-xl-5 col-lg-6 col-md-8 col-sm-10 text-center mt-16">
        <v-btn @click="handleVerifyEmail">Click here to verify your account</v-btn>
      </v-col>
      <v-spacer/>
    </v-row>
  </v-container>
</template>
<script>
import Api from "@/Apis/Api";

export default {
  name: "VerifyAccount",
  data() {
    return {
      token: this.$route.query.token,
    }
  },
  methods: {
    async handleVerifyEmail() {
      let formData = {
        token: this.token
      }

      // Send request update status verify account
      try {
        await Api().put(`/verify-account`, formData)
        await this.$router.replace({name: "Login"});
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>