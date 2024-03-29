import {
  PROVIDER_ID,
  UPDATE_AUTH,
  UPDATE_AUTH_PROFILE,
  UPDATE_OWNER_STATUS,
  UPDATE_PERMISSIONS,
  UPDATE_ROLES,
  UPDATE_USER_INFO,
} from "@/store/mutation-types/auth-mutation-types";
import router from "@/router";
import { GetUserProfile } from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";
import { GetAuthProfile } from "@/Apis/HealthyFormWebApi/AuthApi/AuthApi";

const Auth = {
  namespaced: true,
  state: {
    isAuthenticated: false,
    isOwnProfile: false,
    userInfo: {},
    userAuthenticated: {},
    userRoles: [],
    userPermissions: [],
    providerID: null,
  },
  getters: {
    isGoogleAccount: (state) => {
      return state.providerID !== null;
    },

    isCustomer: (state) => {
      return state.userRoles.includes("customer");
    },

    isDoctor: (state) => {
      return state.userRoles.includes("doctor");
    },
    isAdmin: (state) => state.userRoles.includes("admin"),

    canCreateAPost: (state) => {
      return state.userPermissions.includes("create a post");
    },

    canDeleteAPost: (state) => {
      return state.userPermissions.includes("delete a post");
    },
  },

  actions: {
    /**
     * Check the current user is an owner of profile page
     *
     * @param commit
     * @param state
     */
    checkIsOwnerProfile({ commit, state }) {
      if (
        state.isAuthenticated &&
        router.currentRoute.name === "UserProfiles"
      ) {
        let userIdParam = Number(router.currentRoute.params.userId); // Get userId param

        // Check if the current user id equal to the userId param url
        if (state.userAuthenticated.id === userIdParam) {
          commit(UPDATE_OWNER_STATUS, true); // Set owner of profile is true
        } else {
          commit(UPDATE_OWNER_STATUS, false);
        }
      } else {
        // default
        commit(UPDATE_OWNER_STATUS, false);
      }
    },

    /**
     * Fetch user profile
     *
     * @param dispatch
     * @param commit
     * @param state
     * @param userId
     * @returns {Promise<void>}
     */
    async fetchProfile({ dispatch, commit, state }, userId) {
      try {
        const response = await GetUserProfile(userId);

        if (response) {
          commit(UPDATE_USER_INFO, response.data);
          dispatch("checkIsOwnerProfile", { commit, state });
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response);
          if (error.response.status === 404) {
            await router.push({ name: "NotFounds" });
          }
        }
      }
    },

    /**
     * Fetch user authenticated information
     *
     * @returns {Promise<void>}
     */
    async fetchUserAuthInfo({ commit }) {
      try {
        const res = await GetAuthProfile();

        if (res) {
          commit(UPDATE_AUTH_PROFILE, res.data);
          // console.log('user info', res.data)
          commit(
            UPDATE_ROLES,
            res.data.roles.map((e) => e.name)
          );
          commit(
            UPDATE_PERMISSIONS,
            res.data.permissions.map((e) => e.name)
          );
          commit(PROVIDER_ID, res.data.provider_id);
        }
      } catch (e) {}
    },
  },
  mutations: {
    [UPDATE_AUTH](state, payload) {
      state.isAuthenticated = payload;
    },
    [UPDATE_USER_INFO](state, payload) {
      state.userInfo = payload;
    },
    [UPDATE_AUTH_PROFILE](state, payload) {
      state.userAuthenticated = payload;
    },
    [UPDATE_OWNER_STATUS](state, payload) {
      state.isOwnProfile = payload;
    },
    [UPDATE_ROLES](state, payload) {
      state.userRoles = payload;
    },
    [UPDATE_PERMISSIONS](state, payload) {
      state.userPermissions = payload;
    },
    [PROVIDER_ID](state, payload) {
      state.providerID = payload;
    },
    logout(state) {
      state.userAuthenticated = {};
      state.isAuthenticated = false;
      state.isOwnProfile = false;
      state.userRoles = [];
      state.userPermissions = [];
    },
  },
};
export default Auth;
