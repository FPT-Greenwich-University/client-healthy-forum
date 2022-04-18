<template>
  <section>
    <v-row>
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto">
        <v-btn x-small text color="primary" class="ma-1 d-inline-block">Tags:</v-btn>
        <v-btn class="ma-1 d-inline-block" elevation="1" x-small :title="tag.description" v-for="tag in postTags"
               :key="tag.id"
               @click="handleFetchPostByTag(tag.id)">
          {{ tag.name }}
        </v-btn>
      </v-col>
    </v-row>
  </section>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "TheTags",
  props: {
    postID: {
      type: Number,
      required: true,
    }
  },
  computed: {
    ...mapState('POSTS', ['postTags'])
  },
  watch: {
    handleGetDetailPostTags: {
      handler() {
        this.getDetailPostTags(this.postID)
      },
      immediate: true
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions('POSTS', ['getDetailPostTags']),
    ...mapActions(['fetchPostsByTag']),

    handleFetchPostByTag(tagID) {
      this.fetchPostsByTag(tagID)
    }
  }
}
</script>