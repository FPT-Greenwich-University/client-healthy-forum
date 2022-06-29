<template>
  <section>
    Home page
    <p v-if="isAuthenticated" class="text-center text-xl-subtitle-1">
      Hello {{ userAuthenticated.email }}!
    </p>
    <p v-show="isDoctor">Tao la doctor</p>
  </section>
</template>

<script>
// Axios api
import { mapGetters, mapState } from "vuex";

export default {
  name: "Home",
  components: {},
  computed: {
    ...mapState("AUTH", ["isAuthenticated", "userAuthenticated", "userRoles"]),
    ...mapGetters("AUTH", ["isDoctor"]),
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
