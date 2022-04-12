<template>
  <v-container>
    <v-row v-show="Object.keys(postDetail).length === 0">
      <v-col class="col-12">
        <v-sheet
            class="pa-3"
        >
          <v-skeleton-loader
              class="mx-auto"
              type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      {{ postDetail.categoryName }}
      <!-- Category name -->
      <v-col class="col-12 text-center">
        <p class="text-capitalize">{{ postDetail.categoryName }}</p>
      </v-col>

      <!--Post Title-->
      <v-col class="col-12 text-center">
        <p class="text-capitalize text-h6">{{ postDetail.title }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ThePostDetails",
  computed: {
    ...mapState('POSTS', ['postDetail'])
  },
  watch: {
    fetchPost: {
      handler: function (newValue) {
        let postID = this.$route.params.postID
        this.getDetailPost(postID)
      },
      immediate: true
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions("POSTS", ['getDetailPost'])
  }
}
</script>