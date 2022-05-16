import Vue from "vue";
import Vuex from "vuex";
import Auth from "@/store/modules/Auth";
import Posts from "@/store/modules/Posts";
import Api from "@/Apis/Api";
import {SET_COMMENTS, SET_POSTS} from "@/store/mutation-types/post-mutation-types";
import router from "@/router";
import Comments from "@/store/modules/Comments";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: [], comments: [], currentPage: 1, lastPage: 0,
    }, mutations: {
        setCurrentPage(state, data) {
            state.currentPage = data;
        },

        setLastPage(state, data) {
            state.lastPage = data;
        },

        [SET_POSTS](state, data) {
            state.posts = data;
        },
        [SET_COMMENTS](state, data) {
            state.comments = data;
        }

    }, actions: {
        // Fetch the posts
        async fetchPosts({commit}, page = 1) {
            try {
                const response = await Api().get(`/posts?page=${page}`);
                commit(SET_POSTS, response.data.data)
                commit('setLastPage', response.data.last_page);
            } catch (e) {
                console.log(e)
            }
        },

        // Fetch the posts by tag
        async fetchPostsByTag({commit}, page = 1, tagID) {
            try {
                const response = await Api().get(`/posts?tag=${tagID}&page=${page}`)
                commit(SET_POSTS, response.data.data)
                commit('setLastPage', response.data.last_page);
                await router.push({name: 'PostsByTag', params: {tagID: tagID}})
            } catch (e) {
                console.log(e)
                if (e.response) {
                    if (e.response.status === 404) {
                        await router.push({name: 'NotFounds'});
                    }
                }

            }
        },

        // Fetch all comments of the post
        async fetchComments({commit}, payload) {
            try {
                const response = await Api().get(`posts/${payload.postID}/comments?page=${payload.page}`)
                commit(SET_COMMENTS, response.data.data)
                commit('setLastPage', response.data.last_page);
            } catch (e) {
                console.log(e)
            }
        },
    }, modules: {
        AUTH: Auth,
        POSTS: Posts,
        COMMENTS: Comments
    },
});
