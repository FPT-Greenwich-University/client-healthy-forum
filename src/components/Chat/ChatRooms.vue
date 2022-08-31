<template>
  <v-hover v-slot="{ hover }">
    <v-card class="overflow-auto" rounded max-width="450" out outlined>
      <v-card-title>Chat</v-card-title>
      <div>
        <v-card
          v-for="item in chatRooms"
          :key="item.id"
          :elevation="hover ? 12 : 2"
          outlined
          @click="selectRoom(item.id)"
        >
          <TargetUserInfo :chat-room-id="Number(item.id)" />
        </v-card>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
import { FetchChatRoomUsers } from "@/Apis/HealthyFormWebApi/ChatApi";
import { mapMutations, mapState } from "vuex";
import {
  UPDATE_CHAT_ROOM_ID,
  UPDATE_TARGET_USER_ID,
} from "@/store/mutation-types/chat-mutation-types";
import TargetUserInfo from "@/components/Chat/TargetUserInfo";

export default {
  name: "ChatRooms",
  components: { TargetUserInfo },
  props: {
    chatRooms: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
    ...mapState("CHATS", ["targetUserId"]),

    isEmptyChatRooms() {
      return this.chatRooms.length === 0;
    },
  },
  data() {
    return {
      chatRoomUsers: {},
      targetUserInfo: {},
    };
  },
  methods: {
    ...mapMutations("CHATS", [UPDATE_CHAT_ROOM_ID, UPDATE_TARGET_USER_ID]),

    async selectRoom(chatRoomId) {
      this.chatRoomId = chatRoomId;
      this.UPDATE_CHAT_ROOM_ID({ chatRoomId: chatRoomId });
      await this.fetchChatRoomsUsers(chatRoomId);
      this.$emit("select-room");
    },

    async fetchChatRoomsUsers(chatRoomId) {
      try {
        const response = await FetchChatRoomUsers(chatRoomId);

        this.chatRoomUsers = response.data.chat_room_users;

        if (this.userAuthenticated.id === this.chatRoomUsers.source_id) {
          this.UPDATE_TARGET_USER_ID({
            targetUserId: this.chatRoomUsers.target_id,
          });
        } else {
          this.UPDATE_TARGET_USER_ID({
            targetUserId: this.chatRoomUsers.source_id,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
