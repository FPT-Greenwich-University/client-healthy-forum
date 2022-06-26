import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API_URL,
});

axiosClient.defaults.headers.post["Content-Type"] = "application/json";

const Api = () => {
  const token = localStorage.getItem("token");

  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axiosClient;
};
export default Api;

//Public
const GetPublishedPosts = (page) => {
  return Api().get(`/posts?page=${page}`);
};

const GetCommentsByPost = (payload) => {
  return Api().get(`posts/${payload.postID}/comments?page=${payload.page}`);
};

const GetPostsByTag = (page, tagId) => {
  return Api().get(`/posts?tag=${tagId}&page=${page}`);
};

export { GetPublishedPosts, GetCommentsByPost, GetPostsByTag };
