<template>
  <div>
    <v-tooltip v-for="file in files" :key="file.id" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ma-1" rounded v-bind="attrs" x-small v-on="on"
          >{{ file.name }}
          <v-icon color="Perriwinkle" x-small> mdi-download</v-icon>
        </v-btn>
      </template>
      <span>Download {{ file.name }}</span>
    </v-tooltip>

    <!--Download all files-->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="!isEmptyFiles"
          color="Perriwinkle"
          fab
          v-bind="attrs"
          x-small
          v-on="on"
        >
          <v-icon x-small> mdi-download</v-icon>
        </v-btn>
      </template>
      <span>Download all files</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "MessageFiles",
  computed: {
    isEmptyFiles() {
      return this.files.length === 0;
    },
  },
  props: {
    files: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
