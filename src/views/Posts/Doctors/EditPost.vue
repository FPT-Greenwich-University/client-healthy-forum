<template>
  <v-container class="container--fluid">
    <v-row class="mt-10" justify="center">
      <v-col>
        <v-card class="pa-5" elevation="0">
          <v-form>
            <v-text-field
                v-model="formData.title"
                label="Title"
                required
            ></v-text-field>
            <div v-if="errors.title" class="red--text">
              {{ errors.title[0] }}
            </div>

            <v-text-field
                v-model="formData.description"
                label="Description"
                required
            >
            </v-text-field>
            <div v-if="errors.description" class="red--text">
              {{ errors.description[0] }}
            </div>

            <!-- Select Category-->
            <v-select
                v-model="formData.category_id"
                :items="categories"
                chips
                hint="Pick the category for this post"
                item-text="name"
                item-value="id"
                label="Select Category"
                small-chips
            ></v-select>
            <div v-if="errors.category_id" class="red--text">
              {{ errors.category_id[0] }}
            </div>

            <!-- Select Tags -->
            <v-select
                v-model="formData.tags"
                :items="tags"
                chips
                hint="Pick the tags for this post"
                item-text="name"
                item-value="id"
                label="Select Tags"
                multiple
                small-chips
            ></v-select>
            <div v-if="errors.tags" class="red--text">{{ errors.tags[0] }}</div>

            <v-row>
              <v-col class="col-12">
                <p class="text-h6">Thumbnail</p>
              </v-col>
              <v-col class="col-12">
                <v-img
                    v-if="post.image"
                    :src="`${backEndURL}/${post.image.path}`"
                    class="mx-auto"
                    max-height="500"
                    max-width="500"
                ></v-img>
              </v-col>
            </v-row>

            <v-file-input
                v-model="formData.thumbnail"
                accept="image/*"
                chips
                class="mt-5"
                filled
                label="Select new thumbnail (Optional)"
                placeholder="Select your thumbnail"
                prepend-icon="mdi-camera"
                show-size
            ></v-file-input>
            <div v-if="errors.thumbnail" class="red--text">
              {{ errors.thumbnail[0] }}
            </div>

            <!--Editor  content-->
            <p class="font-weight-bold">Content</p>
            <vue-editor v-model="formData.body"></vue-editor>
            <div v-if="errors.body" class="red--text">{{ errors.body[0] }}</div>

            <v-row class="mt-5">
              <v-col class="col-12 text-center">
                <v-btn class="mx-auto" color="white2" rounded @click="updatePost"
                >Submit
                </v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <!-- Error -->
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
  </v-container>
</template>
<script>
import {mapState} from "vuex";
import {
  GetCategories,
  GetTags,
} from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";
import {UpdatePost} from "@/Apis/HealthyFormWebApi/PostApi/PostApi";
import {DoctorGetDetailPost} from "@/Apis/HealthyFormWebApi/DoctorApi/DoctorApi";

export default {
  name: "DoctorEditPosts",
  props: {
    postId: {
      required: true,
      type: Number,
    },
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
  },
  data() {
    return {
      post: {},
      categories: [],
      tags: [],
      backEndURL: process.env.VUE_APP_BACKEND_URL,
      formData: {
        title: "",
        body: "",
        category_id: null,
        description: "",
        tags: [],
        thumbnail: undefined,
      },
      status: undefined,
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
    handleFetchCategoryPosts: {
      handler() {
        this.fetchCategoryPosts();
      },
      immediate: true,
    },
    handleFetchTags: {
      handler() {
        this.fetchTags();
      },
      immediate: true,
    },

    handleFetchDetailPost: {
      handler() {
        this.getDetailPost(this.postId);
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * Handle update new post
     */
    async updatePost() {
      try {
        let formData = new FormData();
        formData.append("title", this.formData.title);
        formData.append("description", this.formData.description);
        formData.append("body", this.formData.body);
        formData.append("category_id", this.formData.category_id);

        if (this.formData.thumbnail !== undefined) {
          formData.append("thumbnail", this.formData.thumbnail);
        }

        this.formData.tags.forEach((element, index) => {
          formData.append(`tags[${index}]`, element);
        });
        const res = await UpdatePost(
            this.userAuthenticated.id,
            this.postId,
            formData
        );

        if (res.status === 204) {
          this.errors = {}; // delete all error
          this.snackbar.content = "Update success";
          this.snackbar.color = "success";
          this.snackbar.status = true;
          this.formData = {};
          await this.getDetailPost(this.postId); // Refresh information post
          this.$emit("update-post-success");
        }
      } catch (e) {
        if (e.response.status === 422) {
          this.status = 422;
          this.errors = e.response.data;
          this.snackbar.color = "red";
          this.snackbar.content = "Failed to update the post";
          this.snackbar.status = true;
        }
      }
    },

    /**
     * Fetch all the categories
     * @returns {Promise<void>}
     */
    async fetchCategoryPosts() {
      try {
        const res = await GetCategories();
        this.categories = res.data.map((e) => {
          return {
            id: e.id,
            name: e.name,
          };
        });
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    },

    /**
     * Fetch all the tags
     * @returns {Promise<void>}
     */
    async fetchTags() {
      try {
        const res = await GetTags();
        this.tags = res.data.map((e) => {
          return {
            id: e.id,
            name: e.name,
          };
        });
      } catch (e) {
        console.log(e);
      }
    },

    async getDetailPost(postId) {
      try {
        let payload = {
          userId: this.userAuthenticated.id,
          postId: postId,
        };
        const response = await DoctorGetDetailPost(payload);

        if (response) {
          this.post = response.data;
          this.formData = {
            title: this.post.title,
            body: this.post.body,
            category_id: this.post.category_id,
            description: this.post.description,
          };
          // Set tags of the formdata
          this.formData.tags = this.post.tags.map((e) => {
            return e.id;
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>