import Api from "@/Apis/Api";
import {SET_DETAIL_POST} from "@/store/mutation-types/post-mutation-types";

const Posts = {
    namespaced: true,
    state: {
        posts: [],
        postDetail: {},
        currentPage: 1, // Default = 1
        lastPage: 0,
    },
    getters: {},
    actions: {
        async getDetailPost({commit}, postID) {
            try {
                const response = await Api().get(`/posts/${postID}`)
                console.log('Post detail', response.data)
                commit(SET_DETAIL_POST, response.data)
            } catch (e) {
                console.log(e.response.data)
            }
        }
    },
    mutations: {
        [SET_DETAIL_POST](state, data) {
            state.postDetail = data
        }
    }
}
export default Posts