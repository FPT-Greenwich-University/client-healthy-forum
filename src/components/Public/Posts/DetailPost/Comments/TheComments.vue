<template>
  <section class="comments">
    <v-row v-if="comments.length === 0">
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto"
        >This post not have comments</v-col
      >
    </v-row>

    <v-row v-else>
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto">
        <v-list two-line>
          <v-subheader class="text--primary">Comments</v-subheader>
          <template v-for="item in comments">
            <v-divider></v-divider>
            <v-list-item :key="item.id">
              <v-list-item-avatar>
                <img v-if="item.user.image" :src="item.user.image.path" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.user.email"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.content"
                ></v-list-item-subtitle>

                <v-btn
                  v-if="isAuthenticated"
                  max-width="20%"
                  x-small
                  @click="handleOpenDialog(item.id)"
                  >Reply</v-btn
                >
              </v-list-item-content>
            </v-list-item>

            <!-- The reply comment -->
            <v-list-group>
              <TheReplyComments :commentID="item.id" :postID="postID" />
            </v-list-group>
          </template>
        </v-list>
        <v-dialog
          v-model="dialog"
          max-width="600"
          transition="dialog-top-transition"
        >
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <!--   Input content   -->
                    <v-textarea
                      v-model="formData.content"
                      auto-grow
                      background-color="grey lighten-5"
                      clear-icon="mdi-close-circle"
                      clearable
                      filled
                      label="Your reply comment"
                    >
                    </v-textarea>
                    <template v-if="errors">
                      <p
                        v-if="errors.content"
                        class="text-subtitle-1 red--text"
                      >
                        {{ errors.content[0] }}
                      </p>
                    </template>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="handleCloseDialog">
                Close
              </v-btn>
              <v-btn color="green darken-1" text @click="handleReplyComment">
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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

    <v-row v-show="comments.length !== 0">
      <v-col>
        <!-- Paginate -->
        <Paginate @change-page="handleFetchComments" />
      </v-col>
    </v-row>
  </section>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Paginate from "@/components/Paginate";
import TheReplyComments from "@/components/Public/Posts/DetailPost/Comments/TheReplyComments";
import { SET_COMMENT_ID } from "@/store/mutation-types/comment-mutation-types";
import { ReplyComment } from "@/Apis/HealthyFormWebApi";

export default {
  name: "TheComments",
  components: { TheReplyComments, Paginate },
  props: {
    postID: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState("AUTH", ["isAuthenticated"]),
    ...mapState("COMMENTS", ["commentID"]),
    ...mapState(["comments"]),
  },

  data() {
    return {
      dialog: false,
      formData: {
        content: "",
      },
      errors: {},
      snackbar: {
        status: false,
        color: "",
        content: "",
        timeout: 3000,
      },
    };
  },
  watch: {
    handleFetchComments: {
      handler() {
        this.handleFetchComments(1);
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["fetchComments"]),
    ...mapMutations("COMMENTS", [SET_COMMENT_ID]),

    handleFetchComments(page = 1) {
      this.fetchComments({
        postID: this.postID,
        page: page,
      });
    },

    /**
     * Handle open dialog and set the parent comment id for reply
     *
     * @param commentID
     */
    handleOpenDialog(commentID) {
      this.SET_COMMENT_ID({ commentID });
      this.dialog = true;
    },

    handleCloseDialog() {
      this.SET_COMMENT_ID({
        commentID: null,
      });
      this.formData = {};
      this.dialog = false;
    },

    async handleReplyComment() {
      try {
        const res = await ReplyComment(
          this.postID,
          this.commentID,
          this.formData
        );

        if (res) {
          this.formData = {};
          this.snackbar = { color: "success", content: res.data, status: true };
          this.errors = {};
          this.dialog = false;
        }
      } catch (e) {
        if (e) {
          if (e.response.status === 422) {
            this.errors = e.response.data;
            this.snackbar = {
              color: "red",
              content: "Failed to submit a reply comment",
              status: true,
            };
          }
        }
      }
    },
  },
};
</script>
