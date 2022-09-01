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

const DownloadFile = (payload) => {
  return HealthyFormWebApi().get(
    `${process.env.VUE_APP_BACKEND_API_URL}/chat-rooms/${payload.chatRoomId}/messages/${payload.messageId}/files/${payload.fileId}`,
    {
      responseType: "blob",
    }
  );
};

const DownloadAllFile = (payload) => {
  return HealthyFormWebApi().get(
    `${process.env.VUE_APP_BACKEND_API_URL}/chat-rooms/${payload.chatRoomId}/messages/${payload.messageId}/files`,
    {
      responseType: "blob",
    }
  );
};

export {
  CreateChatRoom,
  FetchChatRoomUsers,
  FetchChatRooms,
  FetchMessages,
  SendMessage,
  DownloadFile,
  DownloadAllFile,
};
