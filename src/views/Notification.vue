<template>
  <v-container>
    <v-row v-for="item in notifications" :key="item.id">
      <v-col>
        <v-card elevation="1">
          <v-card-title>New post has release</v-card-title>
          <v-card-text>{{ item.content }}</v-card-text>
          <v-card-actions>
            <v-btn icon @click="viewDetail(item.type)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Paginate -->
    <v-row v-if="notifications.length > 0">
      <v-col>
        <Paginate @change-page="getNotifications" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getAllNotifications } from "@/Apis/HealthyFormWebApi/NotificationApi";
import Paginate from "@/components/Paginate";
import router from "@/router";

export default {
  name: "Notification",
  components: { Paginate },
  data() {
    return {
      notifications: [],
    };
  },
  watch: {
    handleFetchNotification: {
      handler() {
        this.getNotifications();
      },
      immediate: true,
    },
  },

  methods: {
    async getNotifications(page = 1) {
      try {
        const response = await getAllNotifications(page);
        // console.log("Get notification success", response);
        this.notifications = response.data.data;
        this.$store.commit("setCurrentPage", response.data.current_page);
        this.$store.commit("setLastPage", response.data.last_page);
      } catch (e) {
        console.log(e);
      }
    },

    viewDetail(type) {
      router.push({ path: type });
    },
  },
};
</script>

<style scoped></style>