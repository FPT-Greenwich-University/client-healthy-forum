<template>
  <v-row v-if="isAuthenticated" justify="center">
    <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10">
      <!--   Input content   -->
      <v-textarea
        v-model="content"
        auto-grow
        background-color="white1"
        clear-icon="mdi-close-circle"
        clearable
        filled
        label="Comment"
      >
      </v-textarea>

      <!--  Send button    -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="blackBrown"
            dark
            rounded
            elevation="1"
            small
            v-bind="attrs"
            @click="handleComment"
            v-on="on"
          >
            Send
            <v-icon right small>fas fa-paper-plane</v-icon>
          </v-btn>
        </template>
        <span>Click to upload comment</span>
      </v-tooltip>

      <!--   List error   -->
      <template v-if="errors">
        <p v-if="errors.content" class="red--text">{{ errors.content[0] }}</p>
      </template>

      <v-snackbar
        v-model="snackbar.status"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
      >
        {{ snackbar.content }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.status = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>
<script>
import HealthySocialWebApi from "@/Apis/HealthyFormWebApi/HealthySocialWebApi";
import { mapActions, mapState } from "vuex";

export default {
  name: "FormInputComment",
  props: {
    postId: {
      required: true,
      type: Number,
    },
  },
  computed: {
    ...mapState("AUTH", ["isAuthenticated"]),
  },
  data() {
    return {
      content: "",
      snackbar: {
        status: false,
        color: "",
        content: "",
        timeout: 3000,
      },
      responseText: "",
      errors: {},
    };
  },
  methods: {
    ...mapActions(["fetchComments"]),

    async handleComment() {
      try {
        const res = await HealthySocialWebApi().post(
          `/posts/${this.postId}/comments`,
          {
            content: this.content,
          }
        );

        if (res) {
          this.errors = {};
          await this.fetchComments({
            postId: this.postId,
            page: 1,
          });
          this.snackbar = { content: res.data, color: "success", status: true };
          this.content = ""; // reset content
        }
      } catch (e) {
        if (e) {
          if (e.response.status === 422) {
            console.log(e.response.data.errors);
            this.errors = e.response.data.errors;
            this.snackbar = {
              content: "Failed comment",
              color: "red",
              status: true,
            };
          }
        }
      }
    },
  },
};
</script>
