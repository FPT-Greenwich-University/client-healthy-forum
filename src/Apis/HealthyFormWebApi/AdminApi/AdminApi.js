import HealthyFormWebApi from "../HealthyFormWebApi";

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
  CreateNewCategory,
  UpdateCategory,
  UpdatePermissions,
  AdminGetDetailPost,
  AdminUpdateStatusPost,
  DeletePost,
  DeleteCategory,
  GetNotPublishedPosts,
  GetPostsMostLike,
  GetListPermissionsByRole,
};
