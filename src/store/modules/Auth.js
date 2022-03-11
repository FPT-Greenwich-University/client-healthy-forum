import {UPDATE_AUTH, UPDATE_USER_INFO} from "@/store/mutation-types/auth-mutation-types";
import Api from "@/Apis/Api";

const Auth = {
    namespaced: true,
    state: {
        isAuthenticated: false,
        userInfo: {}
    },
    getters: {
        getFullName: state => {
            if (state.userInfo.profile) {
                return `${state.userInfo.profile.city}, ${state.userInfo.profile.district}, ${state.userInfo.profile.ward}`
            } else {
                return ''
            }
        }
    },
    actions: {
        async fetchProfile({commit}) {
            try {
                const response = await Api().get('/users/profiles')
                // console.log('user profile:', response.data);
                // this.userInfo = response.data
                commit(UPDATE_USER_INFO, response.data)
            } catch (error) {
                console.log(error)
            }
        }
    },
    mutations: {
        [UPDATE_AUTH](state, payload) {
            state.isAuthenticated = payload
        },
        [UPDATE_USER_INFO](state, payload) {
            state.userInfo = payload
        }

    },

}
export default Auth;