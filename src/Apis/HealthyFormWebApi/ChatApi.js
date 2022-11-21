import HealthySocialWebApi from "@/Apis/HealthyFormWebApi/HealthySocialWebApi";

const CreateChatRoom = (targetUserId) => {
  return HealthySocialWebApi().post(`/chat-rooms`, { targetUserId });
};

const FetchChatRooms = () => {
  return HealthySocialWebApi().get("/chat-rooms");
};

const FetchMessages = (chatRoomId) => {
  return HealthySocialWebApi().get(`/chat-rooms/${chatRoomId}/messages`);
};

const SendMessage = (chatRoomId, formData) => {
  return HealthySocialWebApi().post(
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
  return HealthySocialWebApi().get(
    `${process.env.VUE_APP_BACKEND_API_URL}/chat-rooms/${payload.chatRoomId}/messages/${payload.messageId}/files/${payload.fileId}`,
    {
      responseType: "blob",
    }
  );
};

const DownloadAllFile = (payload) => {
  return HealthySocialWebApi().get(
    `${process.env.VUE_APP_BACKEND_API_URL}/chat-rooms/${payload.chatRoomId}/messages/${payload.messageId}/files`,
    {
      responseType: "blob",
    }
  );
};

export {
  CreateChatRoom,
  FetchChatRooms,
  FetchMessages,
  SendMessage,
  DownloadFile,
  DownloadAllFile,
};
