import HealthySocialWebApi from "../HealthySocialWebApi";

// Admin api
const CreateNewCategory = (formData) => {
  return HealthySocialWebApi().post("/admins/categories", formData);
};

const UpdateCategory = (categoryId, formData) => {
  return HealthySocialWebApi().put(`/admins/categories/${categoryId}`, formData);
};

const GetNotPublishedPosts = (page) => {
  return HealthySocialWebApi().get(`/admins/posts/not-published?page=${page}`);
};
const GetPostsMostLike = (page) => {
  return HealthySocialWebApi().get(`/admins/statistic/posts?page=${page}`);
};
const DeleteCategory = (categoryId) => {
  return HealthySocialWebApi().delete(`/admins/categories/${categoryId}`);
};

const DeletePost = (postId) => {
  return HealthySocialWebApi().delete(`/posts/${postId}`);
};

const AdminGetDetailPost = (postId) => {
  return HealthySocialWebApi().get(`/admins/posts/${postId}`);
};

const AdminUpdateStatusPost = (postId) => {
  return HealthySocialWebApi().put(`/admins/posts/${postId}/publish`);
};

const GetListPermissionsByRole = (roleId) => {
  return HealthySocialWebApi().post(`/admins/permissions`, { role_id: roleId });
};

const UpdatePermissions = (userId, formData) => {
  return HealthySocialWebApi().put(
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
