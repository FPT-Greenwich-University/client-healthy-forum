import { SET_COMMENT_ID } from "@/store/mutation-types/comment-mutation-types";

const comments = {
  namespaced: true,
  state: {
    commentId: null,
  },
  getters: {},
  actions: {},
  mutations: {
    [SET_COMMENT_ID](state, payload) {
      state.commentId = payload.commentId;
    },
  },
};
export default comments;
