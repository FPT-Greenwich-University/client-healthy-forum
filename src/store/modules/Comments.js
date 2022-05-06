import {SET_COMMENT_ID} from "@/store/mutation-types/comment-mutation-types";

const comments = {
    namespaced: true,
    state: {
        commentID: null,
    },
    getters: {},
    actions: {},
    mutations: {
        [SET_COMMENT_ID](state, payload) {
            state.commentID = payload.commentID
        },
    },
}
export default comments