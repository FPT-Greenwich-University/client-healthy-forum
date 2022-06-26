import Vue from "vue";
import Vuex from "vuex";
import Auth from "@/store/modules/Auth";
import Posts from "@/store/modules/Posts";
import {
  SET_COMMENTS,
  SET_POSTS,
} from "@/store/mutation-types/post-mutation-types";
import router from "@/router";
import Comments from "@/store/modules/Comments";
import {
  GetCommentsByPost,
  GetPostsByTag,
  GetPublishedPosts,
} from "../Apis/Api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    comments: [],
    currentPage: 1,
    lastPage: 0,
  },
  actions: {
    // Fetch the posts
    async fetchPosts({ commit }, page = 1) {
      try {
        const response = await GetPublishedPosts(page);

        commit(SET_POSTS, response.data.data);
        commit("setLastPage", response.data.last_page);
      } catch (e) {
        console.log(e);
      }
    },

    // Fetch the posts by tag
    async fetchPostsByTag({ commit }, page = 1, tagID) {
      try {
        const response = await GetPostsByTag(page, tagID);

        commit(SET_POSTS, response.data.data);
        commit("setLastPage", response.data.last_page);
        await router.push({ name: "PostsByTag", params: { tagID: tagID } });
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
  },
});
