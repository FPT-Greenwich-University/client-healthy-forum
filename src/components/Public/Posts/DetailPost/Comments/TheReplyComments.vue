<template>
  <div>
    <template v-for="item in replyComments">
      <v-list>
        <v-divider></v-divider>
        <v-list-item :key="item.id" class="mx-10">
          <v-list-item-avatar>
            <img v-if="item.user.image" :src="item.user.image.path">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.user.email"></v-list-item-title>
            <v-list-item-subtitle v-html="item.content"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>
<script>
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi";

export default {
  name: 'TheReplyComments',
  props: {
    postID: {
      required: true,
      type: Number
    },
    commentID: {
      required: true,
      type: Number
    },
  },
  watch: {
    handleFetchReplyComments: {
      handler() {
        console.log('commentID', this.commentID)
        this.fetchReplyComments();
      }, immediate: true
    }
  },
  data() {
    return {
      replyComments: [],
    }
  },
  methods: {
    async fetchReplyComments() {
      try {
        const res = await HealthyFormWebApi().get(`/posts/${this.postID}/comments/${this.commentID}/reply`)
        console.log('Reply comment', res)
        this.replyComments = res.data
      } catch (e) {
        if (e) {
          console.log('Error fetch reply comment', e)
        }
      }
    }
  }
}
</script>