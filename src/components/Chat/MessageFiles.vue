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
          <v-icon color="Perriwinkle" x-small> mdi-download</v-icon>
        </v-btn>
      </template>
      <span>Download {{ file.name }}</span>
    </v-tooltip>

    <!--Download all files-->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="!isEmptyFiles"
          color="Perriwinkle"
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
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";
import { mapState } from "vuex";

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
    downloadFile(fileId) {
      const URL = `${process.env.VUE_APP_BACKEND_API_URL}/files/${fileId}`;
      window.open(URL);
    },

    downloadAllFile(messageId) {
      const URL = `${process.env.VUE_APP_BACKEND_API_URL}/messages/${this.messageId}/files`;
      window.open(URL);
    },
  },
};
</script>

<style scoped></style>
