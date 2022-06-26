import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API_URL,
});

axiosClient.defaults.headers.post["Content-Type"] = "application/json";

const HealthyFormWebApi = () => {
  const token = localStorage.getItem("token");

  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axiosClient;
};
export default HealthyFormWebApi;

// Public resource api
const GetPublishedPosts = (page) => {
  return HealthyFormWebApi().get(`/posts?page=${page}`);
};

const GetCommentsByPost = (payload) => {
  return HealthyFormWebApi().get(
    `posts/${payload.postID}/comments?page=${payload.page}`
  );
};

const GetPostsByTag = (page, tagId) => {
  return HealthyFormWebApi().get(`/posts?tag=${tagId}&page=${page}`);
};

const GetCategories = () => {
  return HealthyFormWebApi().get("/categories");
};

// Admin api
const CreateNewCategory = (formData) => {
  return HealthyFormWebApi().post("/admins/categories", formData);
};

const UpdateCategory = (categoryId, formData) => {
  return HealthyFormWebApi().put(`/admins/categories/${categoryId}`, formData);
};

const GetNotPublishedPosts = (page) => {
  return HealthyFormWebApi().get(`/admins/posts/not-published?page=${page}`);
};
const GetPostsMostLike = (page) => {
  return HealthyFormWebApi().get(`/admins/statistic/posts?page=${page}`);
};
const DeleteCategory = (categoryId) => {
  return HealthyFormWebApi().delete(`/admins/categories/${categoryId}`);
};

const DeletePost = (postId) => {
  return HealthyFormWebApi().delete(`/posts/${postId}`);
};

const AdminGetDetailPost = (postId) => {
  return HealthyFormWebApi().get(`/admins/posts/${postId}`);
};

const AdminUpdateStatusPost = (postId) => {
  return HealthyFormWebApi().put(`/admins/posts/${postId}/publish`);
};

const GetListPermissionsByRole = (roleId) => {
  return HealthyFormWebApi().post(`/admins/permissions`, { role_id: roleId });
};

const UpdatePermissions = (userId, formData) => {
  return HealthyFormWebApi().put(
    `/admins/users/${userId}/permissions`,
    formData
  );
};

export {
  GetPublishedPosts,
  GetCommentsByPost,
  GetPostsByTag,
  GetPostsMostLike,
  GetCategories,
  GetNotPublishedPosts,
  CreateNewCategory,
  UpdateCategory,
  DeleteCategory,
  DeletePost,
  AdminGetDetailPost,
  AdminUpdateStatusPost,
  GetListPermissionsByRole,
  UpdatePermissions,
};
