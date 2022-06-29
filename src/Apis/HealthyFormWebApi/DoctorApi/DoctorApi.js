import HealthyFormWebApi from "../HealthyFormWebApi";

const DoctorGetDetailPost = (payload) => {
  return HealthyFormWebApi().get(
    `/users/${payload.userID}/posts/${payload.postID}`
  );
};

const DoctorDeletePost = (payload) => {
  return HealthyFormWebApi().delete(`/posts/${payload.postID}`);
};

export { DoctorDeletePost, DoctorGetDetailPost };
