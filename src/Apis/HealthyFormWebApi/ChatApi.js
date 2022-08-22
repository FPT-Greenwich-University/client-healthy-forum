import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";

const CreateChatRoom = (sourceId, targetId) => {
  return HealthyFormWebApi().post(`/chat-rooms`, { sourceId, targetId });
};

const FetchChatRooms = () => {
  return HealthyFormWebApi().get("/chat-rooms");
};
const FetchMessages = (chatRoomId, targetId) => {
  return HealthyFormWebApi().get(`/chat-rooms/${chatRoomId}/messages`, {
    params: {
      targetId: targetId,
    },
  });
};
const FetchChatRoomUsers = (chatRoomId) => {
  return HealthyFormWebApi().get(`/chat-rooms/${chatRoomId}/users`);
};

const SendMessage = (chatRoomId, formData) => {
  return HealthyFormWebApi().post(
    `/chat-rooms/${chatRoomId}/messages`,
    formData,
    {
      header: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
export {
  CreateChatRoom,
  FetchChatRoomUsers,
  FetchChatRooms,
  FetchMessages,
  SendMessage,
};
