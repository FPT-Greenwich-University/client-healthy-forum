<template>
  <section class="comments">
    <v-row v-if="comments.length === 0">
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto"
      >This post not have comments
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10 mx-auto">
        <v-list two-line>
          <v-subheader class="text--primary">Comments</v-subheader>
          <template v-for="item in comments">
            <v-divider></v-divider>

            <v-list-item :key="item.id">
              <v-list-item-avatar>
                <img v-if="item.user.image" :src="item.user.image.path"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle
                    v-html="item.user.email"
                ></v-list-item-subtitle>
                <v-list-item-title v-html="item.content"></v-list-item-title>

                <div class="flex flex-row">
                  <v-btn
                      v-if="isAuthenticated"
                      class="mr-2"
                      max-width="20%"
                      x-small
                      @click="handleOpenDialog(item.id)"
                  >Reply
                  </v-btn>

                  <!-- Edit comment component -->
                  <template v-if="item.user_id === userAuthenticated.id">
                    <EditComment
                        :comment-id="item.id"
                        @handle-fetch-comments="handleFetchComments(1)"
                    />
                  </template>

                  <!-- Delete comment -->
                  <template v-if="item.user_id === userAuthenticated.id">
                    <DeleteComment
                        :comment-id="item.id"
                        @handle-fetch-comments="handleFetchComments(1)"
                    />
                  </template>
                </div>
              </v-list-item-content>
            </v-list-item>

            <!-- The reply comment -->
            <!-- When click list group, this will open the reply comment component and fetching reply comment  -->
            <v-list-group>
              <TheReplyComments :commentId="item.id" :postId="postId"/>
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
        <Paginate @change-page="handleFetchComments"/>
      </v-col>
    </v-row>
  </section>
</template>
<script>
import {mapActions, mapMutations, mapState} from "vuex";
import Paginate from "@/components/Paginate";
import TheReplyComments from "@/components/Public/Posts/DetailPost/Comments/TheReplyComments";
import {SET_COMMENT_ID} from "@/store/mutation-types/comment-mutation-types";
import {ReplyComment} from "@/Apis/HealthyFormWebApi/CustomerApi/CustomerApi";
import EditComment from "@/components/Comments/EditComment";
import DeleteComment from "@/components/Comments/DeleteComment";

export default {
  name: "TheComments",
  components: {DeleteComment, EditComment, TheReplyComments, Paginate},
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState("AUTH", ["isAuthenticated", "userAuthenticated"]),
    ...mapState("COMMENTS", ["commentId"]),
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
    ...mapActions("COMMENTS", ["fetchReplyComments"]),
    ...mapMutations("COMMENTS", [SET_COMMENT_ID]),

    handleFetchComments(page = 1) {
      this.fetchComments({
        postId: this.postId,
        page: page,
      });
    },

    /**
     * Handle open dialog and set the parent comment id for reply
     *
     * @param commentId
     */
    handleOpenDialog(commentId) {
      this.SET_COMMENT_ID({commentId});
      this.dialog = true;
    },

    handleCloseDialog() {
      this.SET_COMMENT_ID({
        commentId: null,
      });
      this.formData = {};
      this.dialog = false;
    },

    async handleReplyComment() {
      try {
        const res = await ReplyComment(
            this.postId,
            this.commentId,
            this.formData
        );

        if (res) {
          this.formData = {};
          this.snackbar = {color: "success", content: res.data, status: true};
          this.errors = {};
          this.dialog = false;

          // Fetch reply comment again
          await this.fetchReplyComments({
            postId: this.postId,
            commentId: this.commentId,
          });
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