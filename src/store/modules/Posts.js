import Api from "@/Apis/Api";
import {SET_DETAIL_POST, SET_DETAIL_POST_TAGS} from "@/store/mutation-types/post-mutation-types";
import router from "@/router";

const Posts = {
    namespaced: true,
    state: {
        posts: [],
        postDetail: {},
        postTags: [],
    },
    getters: {},
    actions: {
        getDetailPost: async function ({commit}, postID) {
            try {
                const response = await Api().get(`/posts/${postID}`)
                commit(SET_DETAIL_POST, response.data)
            } catch (e) {
                if (e.response) {
                    if (e.response.status === 404) {
                        await router.push({name: 'NotFounds'});
                    }
                }
            }
        },

        getDetailPostTags: async function ({commit}, postID) {
            try {
                const response = await Api().get(`/posts/${postID}/tags`)
                commit(SET_DETAIL_POST_TAGS, response.data)
            } catch (e) {
                if (e.response) {
                    if (e.response.status === 404) {
                        await router.push({name: 'NotFounds'});
                    }
                }
            }
        }
    },
    mutations: {
        [SET_DETAIL_POST](state, data) {
            state.postDetail = data
        },
        [SET_DETAIL_POST_TAGS](state, data) {
            state.postTags = data
        }
    }
}
export default Posts