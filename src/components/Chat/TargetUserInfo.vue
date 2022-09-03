<template>
  <v-list-item>
    <v-list-item-avatar>
      <template v-if="isGoogleAccount">
        <v-img :src="targetUser.image_url" alt="Avatar image"></v-img>
      </template>

      <template v-else>
        <v-img
          v-if="targetUser.image"
          :src="`${backEndUrl}/${targetUser.image.path}`"
        ></v-img>
      </template>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-html="chatRoom.name"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { GetUserProfile } from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";
import { mapState } from "vuex";

export default {
  name: "TargetUserInfo",
  props: {
    chatRoom: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    Echo.private(`chat.${this.chatRoom.chat_room_id}`).listen(
      "MessageSent",
      (e) => {
        // console.log(e);
        this.$emit("retrieve-message");

        // If current user is the target user retrieve the message then alert sound
        if (e.user.id !== this.userAuthenticated.id) {
          this.$emit("notification");
        }
      }
    );
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
    isGoogleAccount() {
      if (!this.isEmptyObject(this.targetUser)) {
        return this.targetUser.provider_id !== null;
      }
    },
  },
  data() {
    return {
      targetUser: {},
      backEndUrl: process.env.VUE_APP_BACKEND_URL,
    };
  },
  watch: {
    fetchTargetUser: {
      handler() {
        this.fetchTargetUserInfo(this.chatRoom.target_user_id);
      },
      immediate: true,
    },
  },
  methods: {
    async fetchTargetUserInfo(targetUserId) {
      try {
        const response = await GetUserProfile(targetUserId);
        this.targetUser = response.data;
      } catch (e) {
        console.log(e);
      }
    },

    isEmptyObject(obj) {
      for (let prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          return false;
        }
      }

      return JSON.stringify(obj) === JSON.stringify({});
    },
  },
};
</script>

<style></style>
