<template>
  <v-card class="my-5" elevation="1">
    <v-card-text>
      <v-img
        v-if="item.image.path"
        :src="`${backEndURL}/${item.image.path}`"
        aspect-ratio="2"
        class="rounded"
      >
      </v-img>
      <p class="font-weight-bold mt-5">{{ item.title }}</p>
      <p>Rating: 4.5</p>
      <p>Like: 55</p>
      <p class="green-text" v-if="item.is_published">Have published</p>
      <p class="red--text" v-else>Not published</p>
    </v-card-text>

    <v-card-actions>
      <v-row class="flex flex-row justify-space-between">
        <v-col class="text-left">
          <!-- Post detail of doctor -->
          <v-btn
            v-if="isOwnProfile"
            class="text-decoration-underline"
            color="primary"
            depressed
            plain
            text
            tile
            :to="{
              name: 'TheDoctorPostDetails',
              params: { postID: item.id },
            }"
          >
            Read more
          </v-btn>

          <!-- Post detail published -->
          <v-btn
            v-else
            class="text-decoration-underline"
            color="primary"
            depressed
            plain
            text
            tile
            :to="{
              name: 'ThePostDetails',
              params: { postID: item.id },
            }"
          >
            Read more
          </v-btn>
        </v-col>

        <!--    Owner's profile action   -->
        <v-col v-if="isOwnProfile" class="text-right">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark small v-bind="attrs" v-on="on"> Action</v-btn>
            </template>
            <v-list>
              <v-list-item>
                <EditPostButton :postID="item.id" />
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import EditPostButton from "@/components/Buttons/Posts/Profile/EditPostButton";
import { mapState } from "vuex";
export default {
  name: "PostItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState("AUTH", ["isOwnProfile"]),
  },
  components: {
    EditPostButton,
  },
  data() {
    return {
      backEndURL: process.env.VUE_APP_BACKEND_URL,
    };
  },
  methods: {},
};
</script>
