import HealthySocialWebApi from "../HealthySocialWebApi";

/**
 * Add doctor to favorite list
 */
const AddFollow = (doctorId) => {
  return HealthySocialWebApi().post("/users/favorites/doctors", {
    doctor_id: doctorId,
  });
};

/**
 * Remove doctor in favorite
 */
const UnFollow = (userId, doctorId) => {
  return HealthySocialWebApi().delete(
    `/users/${userId}/favorites/doctors/${doctorId}`
  );
};

/**
 * Handle reply comment
 */
const ReplyComment = (postId, commentId, formData) => {
  return HealthySocialWebApi().post(
    `/posts/${postId}/comments/${commentId}/reply`,
    formData
  );
};

/**
 * Check user is follow the doctor
 */
const CheckIsFollowDoctor = (userId, doctorId) => {
  return HealthySocialWebApi().get(
    `/users/${userId}/favorites/doctors/${doctorId}`
  );
};

const GetReplyComments = (postId, commentId) => {
  return HealthySocialWebApi().get(
    `/posts/${postId}/comments/${commentId}/reply`
  );
};

const GetFavoritePosts = (userId, page) => {
  return HealthySocialWebApi().get(
    `/users/${userId}/favorites/posts?page=${page}`
  );
};

const GetFavoriteDoctors = (userId, page) => {
  return HealthySocialWebApi().get(
    `/users/${userId}/favorites/doctors?page=${page}`
  );
};

const AddPostToFavorite = (postId) => {
  return HealthySocialWebApi().post("/users/favorites/posts", {
    postId: postId,
  });
};
const RemovePostFromFavorite = (userId, postId) => {
  return HealthySocialWebApi().delete(
    `/users/${userId}/favorites/posts/${postId}`
  );
};

const CheckPostFavoriteExisted = (userId, postId) => {
  return HealthySocialWebApi().get(`/users/${userId}/favorites/posts/${postId}`);
};
export {
  CheckIsFollowDoctor,
  GetReplyComments,
  ReplyComment,
  AddFollow,
  UnFollow,
  GetFavoritePosts,
  GetFavoriteDoctors,
  AddPostToFavorite,
  CheckPostFavoriteExisted,
  RemovePostFromFavorite,
};
