import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    books: [],
    totalPage: 0,
    currentPage: 1,
    lastPage: 0,
  },
  mutations: {
    setUsers(state, data) {
      state.users = data;
    },

    setBooks(state, data) {
      state.books = data;
    },

    setCurrentPage(state, page) {
      state.currentPage = page;
    },

    setLastPage(state, totalPage) {
      state.lastPage = totalPage;
    },
  },
  actions: {
    async fetchUsers({ commit }, page) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users?page=${page}`
        );
        console.log(response);
        let users = response.data.data.map((e) => {
          return {
            id: e.id,
            email: e.email,
            name: e.name,
          };
        });
        commit("setUsers", users);
        commit("setLastPage", response.data.last_page);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchbooks({ commit }, page) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/books?page=${page}`
        );
        console.log(response);
        let books = response.data.data.map((e) => {
          return {
            id: e.id,
            author: e.author,
            name: e.name,
          };
        });
        commit("setBooks", books);
        commit("setLastPage", response.data.last_page);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
