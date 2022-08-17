import healthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";

const CreateChatRoom = (sourceId, targetId) => {
  return HealthyFormWebApi().post(`/chat-rooms`, { sourceId, targetId });
};

export { CreateChatRoom };
