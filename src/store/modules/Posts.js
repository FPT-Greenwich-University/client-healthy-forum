import HealthyFormWebApi from "@/Apis/HealthyFormWebApi";
import {SET_DETAIL_POST, SET_DETAIL_POST_TAGS, SET_TOTAL_LIKE} from "@/store/mutation-types/post-mutation-types";
import router from "@/router";

const Posts = {
    namespaced: true,
    state: {
        posts: [], postDetail: {}, postTags: [], totalLikes: 0,
    },
    getters: {},
    actions: {
        /**
         * Public detail post
         * @param commit
         * @param postID
         * @returns {Promise<void>}
         */
        getDetailPost: async function ({commit}, postID) {
            try {
                const response = await HealthyFormWebApi().get(`/posts/${postID}`)
                commit(SET_DETAIL_POST, response.data)
            } catch (e) {
                if (e.response) {
                    if (e.response.status === 404) {
                        await router.push({name: 'NotFounds'});
                    }
                }
            }
        },

        /**
         * Doctor get their detail post
         *
         * @param commit
         * @param payload
         * @returns {Promise<void>}
         */
        async doctorGetDetailPost({commit}, payload) {
            try {
                const response = await HealthyFormWebApi().get(`/users/${payload.userID}/posts/${payload.postID}`)
                commit(SET_DETAIL_POST, response.data)
            } catch (e) {
                if (e.response) {
                    if (e.response.status === 404) {
                        await router.push({name: 'NotFounds'});
                    }
                }
            }
        },

        /**
         * Get all tag belong to the post
         *
         * @param commit
         * @param postID
         * @returns {Promise<void>}
         */
        getDetailPostTags: async function ({commit}, postID) {
            try {
                const response = await HealthyFormWebApi().get(`/posts/${postID}/tags`)
                commit(SET_DETAIL_POST_TAGS, response.data)
            } catch (e) {
                if (e.response) {
                    if (e.response.status === 404) {
                        await router.push({name: 'NotFounds'});
                    }
                }
            }
        },

        /**
         * Get the total like of the post
         *
         * @param commit
         * @param postID
         * @returns {Promise<void>}
         */
        async getTotalLikeOfPost({commit}, postID) {
            try {
                const res = await HealthyFormWebApi().get(`/posts/${postID}/total-likes`)
                commit(SET_TOTAL_LIKE, res.data.total_likes)
            } catch (e) {
                if (e) {
                    console.log(e)
                }
            }
        },

        /**
         * Handle delete post
         *
         * @param commit
         * @param payload
         * @returns {Promise<AxiosResponse<any>>}
         */
        async deletePost({commit}, payload) {
            return await HealthyFormWebApi().delete(`/posts/${payload.postID}`)
        }
    },
    mutations: {
        [SET_DETAIL_POST](state, data) {
            state.postDetail = data
        }, [SET_DETAIL_POST_TAGS](state, data) {
            state.postTags = data
        }, [SET_TOTAL_LIKE](state, totalLikes) {
            state.totalLikes = totalLikes
        }
    }
}
export default Posts