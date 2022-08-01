<template>
  <div>
    <template v-for="item in replyComments">
      <v-list>
        <v-divider></v-divider>
        <v-list-item :key="item.id" class="mx-10">
          <v-list-item-avatar>
            <img v-if="item.user.image" :src="item.user.image.path" alt="Image"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.user.email"></v-list-item-title>
            <v-list-item-subtitle v-html="item.content"></v-list-item-subtitle>
          </v-list-item-content>
          <template v-if="item.user_id === userAuthenticated.id">
            <EditComment
                :comment-id="item.id"
                @handle-fetch-comments="handleFetchReplyComments()"
            />
          </template>
          <template v-if="item.user_id === userAuthenticated.id">
            <DeleteComment
                :comment-id="item.id"
                @handle-fetch-comments="handleFetchReplyComments()"
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
/**
 * Component
 */
import EditComment from "@/components/Comments/EditComment";
import DeleteComment from "@/components/Comments/DeleteComment";
/**
 * Vuex
 */
import {mapActions, mapState} from "vuex";

export default {
  name: "TheReplyComments",
  components: {DeleteComment, EditComment},
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
    ...mapState("COMMENTS", ["replyComments"]),
  },
  watch: {
    handleFetchReplyComments: {
      handler() {
        this.handleFetchReplyComments();
      },
      immediate: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("COMMENTS", ["fetchReplyComments"]),

    async handleFetchReplyComments() {
      let payload = {
        postId: this.$route.params.postId,
        commentId: this.commentId,
      };

      await this.fetchReplyComments(payload);
    },
  },
};
</script>