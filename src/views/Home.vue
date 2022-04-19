<template>
  <section>
    Home page
    <p class="text-center text-xl-subtitle-1">Hello {{ userInfo.name }}!</p>
  </section>
</template>

<script>
// Axios api
import Api from "@/Apis/Api";

const userInfoState = {name: '', email: ''}

export default {
  name: 'Home',

  components: {},
  watch: {
    getUserInfo: {
      handler() {
        this.fetchUserInfo()
      },
      immediate: true,
    }
  },
  data() {
    return {
      userInfo: {
        ...userInfoState
      }
    }
  },

  methods: {
    async fetchUserInfo() {
      if (localStorage.getItem('token')) {
        try {
          const response = await Api().get('/user')
          if (response) {
            this.userInfo = {
              name: response.data.name,
              email: response.data.email,
            }
          }
        } catch (error) {
          if (error) {
            console.log(error.response.error)
          }
        }
      }
    }

  },
}
</script>
