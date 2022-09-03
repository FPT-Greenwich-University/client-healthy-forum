<template>
  <v-hover v-slot="{ hover }">
    <v-card class="overflow-auto" max-width="450" out outlined rounded>
      <v-card-title
        ><small class="text-caption">{{
          userAuthenticated.name
        }}</small></v-card-title
      >
      <div>
        <v-card
          v-for="item in chatRooms"
          :key="item.id"
          :elevation="hover ? 12 : 2"
          outlined
          @click="
            selectRoom(item.chat_room_id);
            setTargetUser(item.target_user_id);
          "
        >
          <TargetUserInfo
            @retrieve-message="emitRetrieveMessage"
            @notification="emitNotification"
            :chat-room="item"
          />
        </v-card>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
/**
 * Vuex
 */
import { mapMutations, mapState } from "vuex";
import {
  UPDATE_CHAT_ROOM_ID,
  UPDATE_TARGET_USER_ID,
} from "@/store/mutation-types/chat-mutation-types";

/**
 * Components
 */
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
    ...mapState("CHATS", ["chatRoomId"]),
  },

  data() {
    return {
      chatRoomUsers: {},
      targetUserInfo: {},
    };
  },
  methods: {
    ...mapMutations("CHATS", [UPDATE_CHAT_ROOM_ID, UPDATE_TARGET_USER_ID]),

    /**
     * Set chat room
     * @param chatRoomId
     * @returns {Promise<void>}
     */
    async selectRoom(chatRoomId) {
      this.UPDATE_CHAT_ROOM_ID({ chatRoomId: chatRoomId });
      this.$emit("select-room");
    },

    /**
     * Set target user to sent message
     * @param targetUserId
     */
    setTargetUser(targetUserId) {
      this.UPDATE_TARGET_USER_ID({
        targetUserId: targetUserId,
      });
    },

    emitRetrieveMessage() {
      this.$emit("retrieve-message");
    },
    emitNotification() {
      this.$emit("notification");
    },
  },
};
</script>

<style scoped></style>
