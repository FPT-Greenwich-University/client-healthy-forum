import HealthySocialWebApi from "@/Apis/HealthyFormWebApi/HealthySocialWebApi";

/**
 * Doctor Create Post
 * @param formData
 */
const CreatePost = (formData) => {
  return HealthySocialWebApi().post("/posts", formData, {
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
  return HealthySocialWebApi().post(
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
