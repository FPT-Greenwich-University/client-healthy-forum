<template>
  <div>
    <v-tooltip v-for="file in files" :key="file.id" bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ma-1"
          rounded
          v-bind="attrs"
          x-small
          @click="downloadFile(file.id)"
          v-on="on"
          >{{ file.name }}
          <v-icon color="blackBrown" x-small> mdi-download</v-icon>
        </v-btn>
      </template>
      <span>Download {{ file.name }}</span>
    </v-tooltip>

    <!--Download all files-->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="!isEmptyFiles"
          color="gray"
          fab
          v-bind="attrs"
          x-small
          @click="downloadAllFile"
          v-on="on"
        >
          <v-icon x-small> mdi-download</v-icon>
        </v-btn>
      </template>
      <span>Download all files</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  DownloadFile,
  DownloadAllFile,
} from "@/Apis/HealthyFormWebApi/ChatApi.js";

export default {
  name: "MessageFiles",
  computed: {
    ...mapState("CHATS", ["chatRoomId"]),

    isEmptyFiles() {
      return this.files.length === 0;
    },
  },
  props: {
    messageId: {
      type: Number,
      required: true,
    },
    files: {
      type: Array,
      required: true,
    },
  },

  methods: {
    async downloadFile(fileId) {
      try {
        const payload = {
          chatRoomId: this.chatRoomId,
          messageId: this.messageId,
          fileId: fileId,
        };

        const response = await DownloadFile(payload);

        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "file.zip");
        document.body.appendChild(fileLink);

        fileLink.click();
      } catch (e) {
        console.log(e);
      }
    },

    async downloadAllFile() {
      try {
        const payload = {
          chatRoomId: this.chatRoomId,
          messageId: this.messageId,
        };
        const response = await DownloadAllFile(payload); // console.log(response);
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", "files.zip");
        document.body.appendChild(fileLink);

        fileLink.click();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
