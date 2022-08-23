<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>Message</v-card-title>
        <v-card-text>
          <v-card
            v-for="item in messages"
            :key="item.id"
            class="my-5"
            color="Olive"
            elevation="1"
          >
            <v-card-text>
              <p class="white--text">{{ item.user.name }}</p>
              <p class="black-text">{{ item.message }}</p>
              <MessageFiles :files="item.files" :message-id="Number(item.id)" />
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import MessageFiles from "@/components/Chat/MessageFiles";

export default {
  name: "ChatMessages",
  components: { MessageFiles },
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
