<template>
  <v-row>
    <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto">
      <p>
        Total Like:
        <slot></slot>
      </p>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "TotalLike",
};
</script>
