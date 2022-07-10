<template>
  <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10">
    <v-btn class="ma-1 d-inline-block" color="primary" text x-small
      >Tags:</v-btn
    >
    <v-btn
      v-for="tag in postTags"
      :key="tag.id"
      :title="tag.description"
      class="ma-1 d-inline-block"
      elevation="1"
      x-small
      @click="handleFetchPostByTag(tag.id)"
    >
      {{ tag.name }}
    </v-btn>
  </v-col>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "TheTags",
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState("POSTS", ["postTags"]),
  },
  watch: {
    handleGetDetailPostTags: {
      handler() {
        this.getDetailPostTags(this.postId);
      },
      immediate: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("POSTS", ["getDetailPostTags"]),
    ...mapActions(["fetchPostsByTag"]),

    handleFetchPostByTag(tagId) {
      this.fetchPostsByTag(tagId);
    },
  },
};
</script>
