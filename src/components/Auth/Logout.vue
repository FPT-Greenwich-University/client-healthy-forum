<template>
  <div>
    <v-btn block plain text @click="logoutGoogle">Logout</v-btn>
  </div>
</template>

<script>
import Api from "@/Apis/Api";
import {mapMutations} from "vuex";

export default {
  name: "Logout",
  methods: {
    ...mapMutations('AUTH', ['logout']),

    async logoutGoogle() {
      const response = await this.$gAuth.signOut()
      // console.log('result logout', response)
      await this.logoutBackend()
    },

    async logoutBackend() {
      try {
        const res = await Api().post('/logout')
        // console.log('res backend', res)
        localStorage.removeItem('token')
        this.logout()
        await this.$router.push({name: 'Login'});
      } catch (e) {
        console.log('Backend logout error', e)
      }
    },
  },
}
</script>