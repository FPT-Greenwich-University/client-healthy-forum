<template>
  <section>
    Home page
    <p v-if="isAuthenticated" class="text-center text-xl-subtitle-1">Hello {{ userAuthenticated.email }}!</p>
  </section>
</template>

<script>
// Axios api
import {mapState} from "vuex";
import Api from "@/Apis/Api";

export default {
  name: 'Home',
  components: {},
  computed: {
    ...mapState('AUTH', ['isAuthenticated', 'userAuthenticated'])
  },
  data() {
    return {}
  },
}
</script>
