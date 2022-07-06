import HealthyFormWebApi from "../HealthyFormWebApi";

const DoctorGetDetailPost = (payload) => {
  return HealthyFormWebApi().get(
    `/users/${payload.userId}/posts/${payload.postId}`
  );
};

const DoctorDeletePost = (payload) => {
  return HealthyFormWebApi().delete(
    `/users/${payload.userID}/posts/${payload.postID}`
  );
};

export { DoctorDeletePost, DoctorGetDetailPost };
