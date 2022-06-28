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

const GetDetailPost = (postId) => {
  return HealthyFormWebApi().get(`/posts/${postId}`);
};
/**
 * Get tags by post
 */
const GetTagsByPost = (postID) => {
  return HealthyFormWebApi().get(`/posts/${postID}/tags`);
};
const GetToltalLikeOfPost = (postID) => {
  return HealthyFormWebApi().get(`/posts/${postID}/tags`);
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

/**
 * Get user profile
 */
const GetUserProfile = (userId) => {
  return await HealthyFormWebApi().get(`/users/${userId}/profiles`);
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

// Auth
const Logout = () => {
  return HealthyFormWebApi().post("/logout");
};

const checkIsFollow = (userId, doctorId) => {
  return HealthyFormWebApi().delete(
    `/users/${userId}/favorites/doctors/${doctorId}`
  );
};
/**
 * Add doctor to favorite list
 */
const AddFollow = (doctorId) => {
  return HealthyFormWebApi().post("/users/favorites/doctors", {
    doctor_id: doctorId,
  });
};

/**
 * Remove doctor in favorite
 */
const UnFollow = (userId, doctorId) => {
  return HealthyFormWebApi().delete(
    `/users/${userId}/favorites/doctors/${doctorId}`
  );
};

/**
 * Handle reply comment
 */
const ReplyComment = (postId, commentId, formData) => {
  return HealthyFormWebApi().post(
    `/posts/${postId}/comments/${commentId}/reply`,
    formData
  );
};

const GetReplyComments = (postId, commentId) => {
  return HealthyFormWebApi().get(
    `/posts/${postId}/comments/${commentId}/reply`
  );
};

const GetAuthProfile = () => {
  return HealthyFormWebApi().get("/user");
};

const DoctorGetDetailPost = (payload) => {
  return HealthyFormWebApi().get(
    `/users/${payload.userID}/posts/${payload.postID}`
  );
};

const DoctorDeletePost = (payload) => {
  return HealthyFormWebApi().delete(`/posts/${payload.postID}`);
};

export {
  GetPublishedPosts,
  GetTagsByPost,
  GetDetailPost,
  GetCommentsByPost,
  GetReplyComments,
  GetPostsByTag,
  GetToltalLikeOfPost,
  GetPostsMostLike,
  GetCategories,
  GetNotPublishedPosts,
  CreateNewCategory,
  UpdateCategory,
  DeleteCategory,
  DeletePost,
  DoctorDeletePost,
  AdminGetDetailPost,
  AdminUpdateStatusPost,
  GetListPermissionsByRole,
  UpdatePermissions,
  Logout,
  AddFollow,
  UnFollow,
  GetAuthProfile,
  checkIsFollow,
  ReplyComment,
  DoctorGetDetailPost,
  GetUserProfile,
};
