import HealthySocialWebApi from "../HealthySocialWebApi";

const DoctorGetOwnPosts = (userId, page) => {
  return HealthySocialWebApi().get(`/users/${userId}/posts?page=${page}`);
};

/**
 * Doctor Get detail own post
 * @param {*} payload
 * @returns
 */
const DoctorGetDetailPost = (payload) => {
  return HealthySocialWebApi().get(
    `/users/${payload.userId}/posts/${payload.postId}`
  );
};

const DoctorDeletePost = (payload) => {
  return HealthySocialWebApi().delete(
    `/users/${payload.userId}/posts/${payload.postId}`
  );
};

export { DoctorGetOwnPosts, DoctorDeletePost, DoctorGetDetailPost };
