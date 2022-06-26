<template>
  <v-container>
    <!--  Search input field  -->
    <v-row class="mt-10 mx-auto col-11 col-xl-12 col-lg-12 col-md-12">
      <v-text-field
          v-model="title"
          append-icon="mdi-magnify"
          clearable
          filled
          label="Search Posts"
          solo
      ></v-text-field>
    </v-row>

    <v-row>
      <v-col
          v-for="item in posts"
          :key="item.id"
          class="col-12 col-xl-6 col-lg-6 col-md-6"
      >
        <v-card
            elevation="0"
        >
          <v-card-text>
            <v-img
                :src="`${backEndURL}/${item.image.path}`"
                aspect-ratio="2"
            ></v-img>
          </v-card-text>

          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-subtitle>Author: <span class="text-lowercase text--primary">{{ item.user.email }}</span>
          </v-card-subtitle>
          <v-card-subtitle>Category: {{ item.category.name }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
                class="text-decoration-underline"
                color="primary"
                depressed
                plain
                text
                tile
                @click="handleDetailPost(item.id)"
            >
              Read more
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Paginate  -->
    <v-row v-if="!isEmptyPosts">
      <v-col>
        <Paginate @change-page="searchPosts"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi";
import Paginate from "@/components/Paginate";

export default {
  name: "Search",
  components: {Paginate},
  computed: {
    isEmptyPosts() {
      return this.posts.length === 0
    },
  },
  watch: {
    title: {
      handler(newValue, oldValue) {
        this.searchPosts()
      },

      deep: true,
    }
  },
  data() {
    return {
      title: '',
      posts: [],
      backEndURL: process.env.VUE_APP_BACKEND_URL
    }
  },
  methods: {
    handleDetailPost(postID) {
      this.$router.push(`/posts/${postID}`)
    },

    async searchPosts(page = 1) {
      try {
        const response = await HealthyFormWebApi().get(`/search?title=${this.title}&page=${page}`)

        if (response) {
          this.posts = response.data.data
          this.$store.commit('setCurrentPage', response.data.current_page)
          this.$store.commit('setLastPage', response.data.last_page)
        }
      } catch (error) {
        if (error) {
          console.log('Search post', error)
        }
      }
    }
  }
}
</script>