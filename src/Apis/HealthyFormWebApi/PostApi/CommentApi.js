import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";

const UpdateComment = (payload) => {
  return HealthyFormWebApi().put(
    `/posts/${payload.postId}/comments/${payload.commentId}`,
    { content: payload.content }
  );
};

export { UpdateComment };
