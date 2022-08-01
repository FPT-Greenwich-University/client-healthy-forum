import {
  SET_COMMENT_ID,
  SET_REPLY_COMMENTS,
} from "@/store/mutation-types/comment-mutation-types";
import { GetReplyComments } from "@/Apis/HealthyFormWebApi/CustomerApi/CustomerApi";

const comments = {
  namespaced: true,
  state: {
    commentId: null,
    replyComments: [],
  },
  getters: {},
  actions: {
    async fetchReplyComments({ commit }, payload) {
      try {
        const res = await GetReplyComments(payload.postId, payload.commentId);
        commit(SET_REPLY_COMMENTS, res.data);
      } catch (error) {
        if (error) {
          console.log("Error fetch reply comment", error);
        }
      }
    },
  },
  mutations: {
    [SET_COMMENT_ID](state, payload) {
      state.commentId = payload.commentId;
    },
    [SET_REPLY_COMMENTS](state, payload) {
      state.replyComments = payload;
    },
  },
};
export default comments;
