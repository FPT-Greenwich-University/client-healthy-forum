import HealthyFormWebApi from "../HealthyFormWebApi";

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

/**
 * Check user is follow the doctor
 */
const CheckIsFollow = (userId, doctorId) => {
  return HealthyFormWebApi().delete(
    `/users/${userId}/favorites/doctors/${doctorId}`
  );
};

const GetReplyComments = (postId, commentId) => {
  return HealthyFormWebApi().get(
    `/posts/${postId}/comments/${commentId}/reply`
  );
};

const GetFavoritePosts = (userId, page) => {
  return HealthyFormWebApi().get(
    `/users/${userId}/favorites/posts?page=${page}`
  );
};

// TODO: Fix api to /users/userId/favorites/doctors
const GetFavoriteDoctors = (page) => {
  return HealthyFormWebApi().get(`/users/favorites/doctors?page=${page}`);
};

export {
  CheckIsFollow,
  GetReplyComments,
  ReplyComment,
  AddFollow,
  UnFollow,
  GetFavoritePosts,
};
