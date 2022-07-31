<template>
  <div>
    <template v-for="item in replyComments">
      <v-list>
        <v-divider></v-divider>
        <v-list-item :key="item.id" class="mx-10">
          <v-list-item-avatar>
            <img v-if="item.user.image" :src="item.user.image.path" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.user.email"></v-list-item-title>
            <v-list-item-subtitle v-html="item.content"></v-list-item-subtitle>
          </v-list-item-content>
          <template v-if="item.user_id === userAuthenticated.id">
            <EditComment
              :comment-id="item.id"
              @handle-fetch-comments="fetchReplyComments()"
            />
          </template>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>
<script>
/**
 * Api call
 */
import { GetReplyComments } from "@/Apis/HealthyFormWebApi/CustomerApi/CustomerApi";
/**
 * Component
 */
import EditComment from "@/components/Comments/EditComment";
/**
 * Vuex
 */
import { mapState } from "vuex";

export default {
  name: "TheReplyComments",
  components: { EditComment },
  props: {
    postId: {
      required: true,
      type: Number,
    },
    commentId: {
      required: true,
      type: Number,
    },
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated", "isAuthenticated"]),
  },
  watch: {
    handleFetchReplyComments: {
      handler() {
        console.log("commentId", this.commentId);
        this.fetchReplyComments();
      },
      immediate: true,
    },
  },
  data() {
    return {
      replyComments: [],
    };
  },
  methods: {
    async fetchReplyComments() {
      try {
        const res = await GetReplyComments(this.postId, this.commentId);
        this.replyComments = res.data;
      } catch (e) {
        if (e) {
          console.log("Error fetch reply comment", e);
        }
      }
    },
  },
};
</script>