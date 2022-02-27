<template>
  <div>
    <p v-show="isLogged" @click="logoutGoogle">Logout</p>
  </div>
</template>

<script>
import Api from "@/Apis/Api";

export default {
  name: "Logout",

  watch: {
    isLogged: {
      handler(newValue) {
        this.isLogged = !!localStorage.getItem('token');
      },
      immediate: true,
    }
  },

  data() {
    return {
      isLogged: false,
    }
  },
  methods: {
    async logoutGoogle() {
      const response = await this.$gAuth.signOut()
      // console.log(response)
      await this.logoutBackend()
    },


    async logoutBackend() {
      try {
        const res = await Api().post('/logout')
        console.log('res backend', res)
        localStorage.removeItem('token')
        location.reload()
      } catch (e) {
        console.log('Backend logout error', e)
      }
    },
  },
}
</script>