import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";

const GetDetailComment = (payload) => {
  return HealthyFormWebApi().get(
    `/posts/${payload.postId}/comments/${payload.commentId}`
  );
};

const UpdateComment = (payload) => {
  return HealthyFormWebApi().put(
    `/posts/${payload.postId}/comments/${payload.commentId}`,
    { content: payload.content }
  );
};

const DeleteComment = (payload) => {
  return HealthyFormWebApi().delete(
    `/posts/${payload.postId}/comments/${payload.commentId}`
  );
};

export { GetDetailComment, UpdateComment, DeleteComment };
