<template>
  <v-container>
    <v-row v-show="posts.length === 0">
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
      <v-col v-for="item in posts" :key="item.id" class="col-6">
        <v-card
            elevation="0"
        >
          <v-img
              :src="item.image.path"
              height="200px"
          ></v-img>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>{{ item.user.email }}</v-card-subtitle>
          <v-card-subtitle>Category: {{ item.category.name }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
                color="lighten-2"
                text
                @click="handleDetailPost(item.id)"
            >
              Read more
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Paginate -->
    <Paginate @change-page="handleGetPosts"/>
  </v-container>
</template>
<script>
import {mapActions, mapState} from 'vuex'
import Paginate from "@/components/Paginate";

export default {
  name: "ThePosts",
  components: {
    Paginate
  },
  computed: {
    ...mapState(["posts"])
  },
  watch: {
    // Get all the post when render component
    fetchPosts: {
      handler() {
        this.handleGetPosts(1);
      },
      immediate: true
    }
  },

  data() {
    return {}
  },
  methods: {
    ...mapActions(['fetchPosts']),

    handleGetPosts(page) {
      this.fetchPosts(page)
    },

    handleDetailPost(postID) {
      this.$router.push(`/posts/${postID}`)
    }
  }
}
</script>