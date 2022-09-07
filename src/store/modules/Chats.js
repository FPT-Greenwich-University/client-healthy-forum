import {
  UPDATE_CHAT_ROOM_ID,
  UPDATE_LOADING_STATUS,
  UPDATE_TARGET_USER_ID,
} from "@/store/mutation-types/chat-mutation-types";

const Chats = {
  namespaced: true,
  state: {
    chatRoomId: "",
    targetUserId: "", // Target user id
    isLoading: false, // Loading animation state for send message
  },
  getters: {},
  actions: {},
  mutations: {
    [UPDATE_CHAT_ROOM_ID](state, payload) {
      state.chatRoomId = payload.chatRoomId;
    },
    [UPDATE_TARGET_USER_ID](state, payload) {
      state.targetUserId = payload.targetUserId;
    },
    [UPDATE_LOADING_STATUS](state, payload) {
      state.isLoading = payload;
    },
  },
};

export default Chats;
