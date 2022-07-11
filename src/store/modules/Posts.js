import {
  SET_DETAIL_POST,
  SET_DETAIL_POST_TAGS,
  SET_TOTAL_LIKE,
} from "@/store/mutation-types/post-mutation-types";
import router from "@/router";
import {
  DoctorDeletePost,
  DoctorGetDetailPost,
} from "@/Apis/HealthyFormWebApi/DoctorApi/DoctorApi";
import {
  GetDetailPost,
  GetTagsByPost,
  GetTotalLikeOfPost,
} from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";

const Posts = {
  namespaced: true,
  state: {
    posts: [],
    postDetail: {},
    postTags: [],
    totalLikes: 0,
  },
  getters: {},
  actions: {
    /**
     * Public detail post
     * @param commit
     * @param postId
     * @returns {Promise<void>}
     */
    getDetailPost: async function ({ commit }, postId) {
      try {
        const response = await GetDetailPost(postId);
        commit(SET_DETAIL_POST, response.data);
      } catch (e) {
        if (e.response) {
          if (e.response.status === 404) {
            await router.push({ name: "NotFounds" });
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
    async doctorGetDetailPost({ commit }, payload) {
      try {
        const response = await DoctorGetDetailPost(payload);
        console.log(response);
        commit(SET_DETAIL_POST, response.data);
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    },

    /**
     * Get all tag belong to the post
     *
     * @param commit
     * @param postId
     * @returns {Promise<void>}
     */
    getDetailPostTags: async function ({ commit }, postId) {
      try {
        const response = await GetTagsByPost(postId);
        commit(SET_DETAIL_POST_TAGS, response.data);
      } catch (e) {
        if (e.response) {
          if (e.response.status === 404) {
            await router.push({ name: "NotFounds" });
          }
        }
      }
    },

    /**
     * Get the total like of the post
     *
     * @param commit
     * @param postId
     * @returns {Promise<void>}
     */
    async getTotalLikeOfPost({ commit }, postId) {
      try {
        const res = await GetTotalLikeOfPost(postId);
        console.log("TOTAL LIKE:", res);
        commit(SET_TOTAL_LIKE, res.data);
      } catch (e) {
        if (e) {
          console.log(e);
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
    async deletePost({ commit }, payload) {
      return await DoctorDeletePost(payload);
    },
  },
  mutations: {
    [SET_DETAIL_POST](state, data) {
      state.postDetail = data;
    },
    [SET_DETAIL_POST_TAGS](state, data) {
      state.postTags = data;
    },
    [SET_TOTAL_LIKE](state, totalLikes) {
      state.totalLikes = totalLikes;
    },
  },
};
export default Posts;
