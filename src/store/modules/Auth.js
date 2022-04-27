import {
    UPDATE_AUTH,
    UPDATE_AUTH_PROFILE,
    UPDATE_OWNER_STATUS,
    UPDATE_ROLES,
    UPDATE_USER_INFO
} from "@/store/mutation-types/auth-mutation-types";
import Api from "@/Apis/Api";
import router from "@/router";

const Auth = {
    namespaced: true,
    state: {
        isAuthenticated: false,
        isOwnProfile: false,
        userInfo: {},
        userAuthenticated: {},
        userRoles: []
    },
    getters: {
        getFullName: state => {
            if (state.userInfo.profile !== undefined) {
                return `${state.userInfo.profile.city}, ${state.userInfo.profile.district}, ${state.userInfo.profile.ward}`
            } else {
                return ''
            }
        },

        isDoctor: state => {
            return state.userRoles.includes('doctor')
        }
    },
    actions: {
        /**
         * Fetch user profile
         *
         * @param commit
         * @param state
         * @param userID
         * @returns {Promise<void>}
         */
        async fetchProfile({commit, state}, userID) {
            try {
                const response = await Api().get(`/users/${userID}/profiles`)
                commit(UPDATE_USER_INFO, response.data)

                if (state.isAuthenticated && router.currentRoute.name === 'UserProfiles') {
                    let userIDParam = Number(router.currentRoute.params.userID)

                    if (state.userAuthenticated.id === userIDParam) {
                        commit(UPDATE_OWNER_STATUS, true) // Set owner of profile is true
                    } else {
                        commit(UPDATE_OWNER_STATUS, false)
                    }
                } else { // default
                    commit(UPDATE_OWNER_STATUS, false)
                }
            } catch (error) {
                if (error.response) {
                    console.log(error.response);
                    if (error.response.status === 404) {
                        await router.push({name: 'NotFounds'})
                    }
                }
            }
        },

        /**
         * Fetch user authenticated information
         *
         * @returns {Promise<void>}
         */
        async fetchUserAuthInfo({commit}) {
            try {
                const res = await Api().get('/user')

                if (res) {
                    commit(UPDATE_AUTH_PROFILE, res.data)
                    let roles = res.data.roles.map(e => {
                        return e.name
                    })
                    commit(UPDATE_ROLES, roles)
                }
            } catch (e) {
            }
        },
    },
    mutations: {
        [UPDATE_AUTH](state, payload) {
            state.isAuthenticated = payload
        },
        [UPDATE_USER_INFO](state, payload) {
            state.userInfo = payload
        },
        [UPDATE_AUTH_PROFILE](state, payload) {
            state.userAuthenticated = payload
        },
        [UPDATE_OWNER_STATUS](state, payload) {
            state.isOwnProfile = payload
        },
        [UPDATE_ROLES](state, payload) {
            state.userRoles = payload
        },
        logout(state) {
            state.userAuthenticated = {}
            state.isAuthenticated = false
            state.isOwnProfile = false
            state.userRoles = []
        }
    },

}
export default Auth;