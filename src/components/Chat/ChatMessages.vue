<template>
  <v-row>
    <v-col>
      <v-card elevation="1" rounded>
        <v-card-title>Message</v-card-title>
        <v-card-text>
          <v-card
            v-for="item in messages"
            :key="item.id"
            class="my-5"
            color="white"
            elevation="1"
            outlined
            shaped
          >
            <v-card-text>
              <p class="black--text">{{ item.user.name }}</p>
              <p class="black--text">{{ item.message }}</p>
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
};
</script>

<style scoped></style>
