<template>
  <v-hover v-slot="{ hover }">
    <v-card class="overflow-auto" max-width="450">
      <v-toolbar color="greenMoodBoard3" dark>Chat</v-toolbar>
      <div>
        <v-card
          v-for="item in chatRooms"
          :key="item.id"
          :elevation="hover ? 12 : 2"
          @click="selectRoom(item.id)"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.name"></v-list-item-title>
              <v-list-item-subtitle v-html=""></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";
import { FetchChatRoomUsers } from "@/Apis/HealthyFormWebApi/ChatApi";
import { mapMutations, mapState } from "vuex";
import {
  UPDATE_CHAT_ROOM_ID,
  UPDATE_TARGET_USER_ID,
} from "@/store/mutation-types/chat-mutation-types";

export default {
  name: "ChatRooms",
  props: {
    chatRooms: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
  },
  data() {
    return {
      chatRoomUsers: {},
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

        if (
          this.userAuthenticated.id === response.data.chat_room_users.source_id
        ) {
          // alert("OK");
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
