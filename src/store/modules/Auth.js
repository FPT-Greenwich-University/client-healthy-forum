import {UPDATE_AUTH} from "@/store/mutation-types";

const Auth = {
    namespaced: true,
    state: {
        isAuthenticated: false,
    },
    mutations: {
        [UPDATE_AUTH](state, payload) {
            state.isAuthenticated = payload
        }
    }
}
export default Auth;