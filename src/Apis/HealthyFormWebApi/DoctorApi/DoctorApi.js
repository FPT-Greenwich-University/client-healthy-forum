import HealthyFormWebApi from "../HealthyFormWebApi";

const DoctorGetOwnPosts = (userId, page) => {
  return HealthyFormWebApi().get(`/users/${userId}/posts?page=${page}`);
};

/**
 * Doctor Get detail own post
 * @param {*} payload
 * @returns
 */
const DoctorGetDetailPost = (payload) => {
  return HealthyFormWebApi().get(
    `/users/${payload.userId}/posts/${payload.postId}`
  );
};

const DoctorDeletePost = (payload) => {
  return HealthyFormWebApi().delete(
    `/users/${payload.userId}/posts/${payload.postId}`
  );
};

export { DoctorGetOwnPosts, DoctorDeletePost, DoctorGetDetailPost };
