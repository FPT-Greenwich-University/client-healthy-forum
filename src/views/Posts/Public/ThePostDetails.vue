<template>
  <v-container>
    <v-row v-show="Object.keys(postDetail).length === 0"
    >
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto">
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

    <!-- Category name -->
    <v-row>
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto">
        <v-card
            elevation="0"
            class="mx-auto text-center"
        >
          <v-card-subtitle>
            Published At {{ postDetail.published_at }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <TheTags :postID="postID"/>

    <v-row>
      <!--Post Title-->
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto">
        <p class="text-capitalize text-h6 text-center">{{ postDetail.title }}</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto text-center">
        <v-card
            elevation="0"
        >
          <v-img v-if="postDetail.image"
                 :src="`${backEndURL}/${postDetail.image.path}`"
                 alt="post image"
                 class="mx-auto"
          >
          </v-img>
          <v-card-title>{{ postDetail.description }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
          class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto text-center"
      >
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col
          class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto text-center"
      >
        <v-card
            elevation="0"
        >
          <v-card-text>
            {{ postDetail.body }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--List Comments-->
    <TheComments :postID="postID"/>
  </v-container>
</template>
<script>
import {mapActions, mapState} from "vuex";
// Components
import TheComments from "@/components/Public/Posts/DetailPost/Comments/TheComments";
import TheTags from "@/components/Public/Posts/DetailPost/Tags/TheTags";

export default {
  name: "ThePostDetails",
  components: {
    TheTags,
    TheComments
  },
  computed: {
    ...mapState('POSTS', ['postDetail'])
  },
  watch: {
    fetchPost: {
      handler: function (newValue) {
        this.getDetailPost(this.postID)
      },
      immediate: true
    }
  },
  data() {
    return {
      postID: Number(this.$route.params.postID),
      backEndURL: process.env.VUE_APP_BACKEND_URL,
    }
  },
  methods: {
    ...mapActions("POSTS", ['getDetailPost'])
  }
}
</script>