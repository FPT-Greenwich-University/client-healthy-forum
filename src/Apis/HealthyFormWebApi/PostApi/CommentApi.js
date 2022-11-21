import HealthySocialWebApi from "@/Apis/HealthyFormWebApi/HealthySocialWebApi";

const GetDetailComment = (payload) => {
  return HealthySocialWebApi().get(
    `/posts/${payload.postId}/comments/${payload.commentId}`
  );
};

const UpdateComment = (payload) => {
  return HealthySocialWebApi().put(
    `/posts/${payload.postId}/comments/${payload.commentId}`,
    { content: payload.content }
  );
};

const DeleteComment = (payload) => {
  return HealthySocialWebApi().delete(
    `/posts/${payload.postId}/comments/${payload.commentId}`
  );
};

export { GetDetailComment, UpdateComment, DeleteComment };
