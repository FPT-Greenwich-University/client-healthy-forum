import Vue from "vue";
import Vuex from "vuex";
import Auth from "@/store/modules/Auth";
import Posts from "@/store/modules/Posts";
import Api from "@/Apis/Api";
import {SET_POSTS} from "@/store/mutation-types/post-mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        posts: [],
        currentPage: 0,
        lastPage: 0,
    },
    mutations: {
        setCurrentPage(state, data) {
            state.currentPage = data;
        },

        setLastPage(state, data) {
            state.lastPage = data;
        },

        [SET_POSTS](state, data) {
            state.posts = data;
        }
    },
    actions: {
        async fetchPosts({commit}, page) {
            try {
                const response = await Api().get(`/posts?page=${page}`);
                commit(SET_POSTS, response.data.data)
                commit('setLastPage', response.data.last_page);
            } catch (e) {
                console.log(e)
            }
        }
    },
    modules: {
        AUTH: Auth,
        POSTS: Posts,
    },
});
