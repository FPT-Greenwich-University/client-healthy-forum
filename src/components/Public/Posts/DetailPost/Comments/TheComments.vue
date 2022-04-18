<template>
  <section class="comments">
    <v-row v-if="comments.length === 0">
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto">This post not have comments</v-col>
    </v-row>
    <v-row v-else>
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto">
        <v-list two-line>
          <v-subheader class="text--primary">Comments</v-subheader>
          <template v-for="item in comments">
            <v-divider></v-divider>
            <v-list-item :key="item.id">
              <v-list-item-avatar>
                <img v-if="item.user.image" :src="item.user.image.path">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.user.email"></v-list-item-title>
                <v-list-item-subtitle v-html="item.content"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
    </v-row>
    <v-row v-show="comments.length !== 0">
      <v-col>
        <!-- Paginate -->
        <Paginate @change-page="fetchComments"/>
      </v-col>
    </v-row>
  </section>
</template>
<script>
import {mapActions, mapState} from "vuex";
import Paginate from "@/components/Paginate";

export default {
  name: "TheComments",
  components: {Paginate},
  props: {
    postID: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['comments']),
  },
  data() {
    return {}
  },
  watch: {
    handleFetchComments: {
      handler() {
        this.fetchComments(this.postID, 1)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['fetchComments'])
  },
}
</script>