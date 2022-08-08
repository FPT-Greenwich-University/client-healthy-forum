<template>
  <Home />
</template>

<script>
import Home from "@/views/Home";

export default {
  name: "App",
  components: {
    Home,
  },
  created() {
    window.Echo.channel("hello").listen("Hello", (e) => {
      console.log(e);
      alert("OK");
    });
  },
};
</script>
