import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";

/**
 * Doctor Create Post
 * @param formData
 */
const CreatePost = (formData) => {
  return HealthyFormWebApi().post("/posts", formData, {
    header: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Doctor update their post
 *
 * @param userId
 * @param postId
 * @param formData
 */
const UpdatePost = (userId, postId, formData) => {
  return HealthyFormWebApi().post(
    `/users/${userId}/posts/${postId}`,
    formData,
    {
      header: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export { CreatePost, UpdatePost };
