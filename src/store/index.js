import Vue from "vue";
import Vuex from "vuex";

import router from "@/router";
import Auth from "@/store/modules/Auth";
import Posts from "@/store/modules/Posts";
import Comments from "@/store/modules/Comments";
import Common from "@/store/modules/Common";
import createPersistedState from "vuex-persistedstate";

/**
 * Mutations
 */
import {
  SET_COMMENTS,
  SET_POSTS,
} from "@/store/mutation-types/post-mutation-types";

/**
 * Apis
 */
import {
  FilterPosts,
  GetCommentsByPost,
  GetPostByCategory,
  GetPostsByTag,
} from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    posts: [],
    comments: [],
    currentPage: 1,
    lastPage: 0,
  },
  actions: {
    async fetchPosts({ commit }, payload) {
      try {
        const response = await FilterPosts(
          payload.categoryId,
          payload.tagId,
          payload.page
        );
        commit(SET_POSTS, response.data.data);
        commit("setLastPage", response.data.last_page);
      } catch (e) {
        console.log(e);
      }
    },

    async fetchPostByCategory({ commit }, payload) {
      try {
        const response = await GetPostByCategory(
          payload.page,
          payload.categoryId
        );

        commit(SET_POSTS, response.data.data);
        commit("setLastPage", response.data.last_page);
      } catch (e) {
        console.log(e);
      }
    },

    async fetchPostsByTag({ commit }, payload) {
      try {
        const response = await GetPostsByTag(payload.page, payload.tagId);

        commit(SET_POSTS, response.data.data);
        commit("setLastPage", response.data.last_page);
      } catch (e) {
        console.log(e);
        if (e.response) {
          if (e.response.status === 404) {
            await router.push({ name: "NotFounds" });
          }
        }
      }
    },

    // Fetch all comments of the post
    async fetchComments({ commit }, payload) {
      try {
        const response = await GetCommentsByPost(payload);

        commit(SET_COMMENTS, response.data.data);
        commit("setLastPage", response.data.last_page);
      } catch (e) {
        console.log(e);
      }
    },
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
    },
    [SET_COMMENTS](state, data) {
      state.comments = data;
    },
  },

  modules: {
    AUTH: Auth,
    POSTS: Posts,
    COMMENTS: Comments,
    COMMON: Common,
  },
});
