<template>
  <v-list-item>
    <v-list-item-avatar>
      <template v-if="isGoogleAccount">
        <v-img :src="userInfo.image_url" alt="Avatar image"></v-img>
      </template>

      <template v-else>
        <v-img :src="`${backEndUrl}/${userInfo.image.path}`"></v-img>
      </template>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-html="userInfo.name"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { FetchChatRoomUsers } from "@/Apis/HealthyFormWebApi/ChatApi";
import { GetUserProfile } from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";
import { mapState } from "vuex";

export default {
  name: "TargetUserInfo",
  props: {
    chatRoomId: {
      required: true,
    },
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
    isGoogleAccount() {
      if (this.userInfo) {
        return this.userInfo.provider_id !== null;
      }
    },
  },
  data() {
    return {
      userInfo: {},
      chatRoomUsers: {},
      backEndUrl: process.env.VUE_APP_BACKEND_URL,
    };
  },
  watch: {
    handleFetchChatRoomUsers: {
      handler() {
        if (this.chatRoomId !== undefined) {
          this.fetchChatRoomUsers(this.chatRoomId);
        }
      },
      immediate: true,
    },
  },
  methods: {
    async fetchChatRoomUsers(chatRoomId) {
      try {
        const response = await FetchChatRoomUsers(chatRoomId);
        this.chatRoomUsers = response.data.chat_room_users;

        if (this.userAuthenticated.id === this.chatRoomUsers.source_id) {
          await this.fetchTargetUserInfo(this.chatRoomUsers.target_id);
        } else {
          await this.fetchTargetUserInfo(this.chatRoomUsers.source_id);
        }
      } catch (e) {
        console.log(e);
      }
    },

    async fetchTargetUserInfo(targetUserId) {
      try {
        const response = await GetUserProfile(targetUserId);
        this.userInfo = response.data;
        // console.log(this.userInfo);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
