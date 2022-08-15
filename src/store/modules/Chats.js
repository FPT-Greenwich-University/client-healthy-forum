import {
  UPDATE_CHAT_ROOM_ID,
  UPDATE_TARGET_USER_ID,
} from "@/store/mutation-types/chat-mutation-types";

const Chats = {
  namespaced: true,
  state: {
    chatRoomId: "",
    targetUserId: "", // Target user id
  },
  getters: {},
  actions: {},
  mutations: {
    [UPDATE_CHAT_ROOM_ID](state, payload) {
      state.chatRoomId = payload.chatRoomId;
    },
    [UPDATE_TARGET_USER_ID](state, payload) {
      console.log("PAYLOAD", payload);
      state.targetUserId = payload.targetUserId;
    },
  },
};

export default Chats;
