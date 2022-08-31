<template>
  <v-container>
    <v-row>
      <v-col class="col-12">
        <v-card outlined rounded tile>
          <v-form class="pa-5">
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

            <v-textarea
              v-model="formData.body"
              Body
              label="Content"
              name=""
            ></v-textarea>
            <div v-if="errors.body" class="red--text">
              {{ errors.body[0] }}
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
            ></v-select>
            <div v-if="errors.tags" class="red--text">
              {{ errors.tags[0] }}
            </div>

            <v-file-input
              v-model="formData.thumbnail"
              accept="image/*"
              chips
              filled
              label="Select your thumbnail"
              placeholder="Select your thumbnail"
              prepend-icon="mdi-camera"
              show-size
            ></v-file-input>
            <div v-if="errors.thumbnail" class="red--text">
              {{ errors.thumbnail[0] }}
            </div>

            <v-btn
              class="mx-2 white--text"
              color="blackBrown"
              rounded
              @click="resetForm"
              >Reset Form
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn
              :disabled="!canCreateAPost"
              class="mx-auto"
              color="white1"
              rounded
              @click="createPost"
              >Create
              <v-icon>mdi-plus-box</v-icon>
            </v-btn>
          </v-form>
          <v-card-subtitle
            v-if="!canCreateAPost"
            class="red--text text-uppercase"
            >You don't have permission to create a new post, please contact to
            admin of website.
          </v-card-subtitle>
        </v-card>

        <!--  Toast notification  -->
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
import { CreatePost } from "@/Apis/HealthyFormWebApi/PostApi/PostApi";
import {
  GetCategories,
  GetTags,
} from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CreatePost",
  computed: {
    ...mapGetters("AUTH", ["isDoctor", "canCreateAPost"]),
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
  },
  data() {
    return {
      categories: [],
      tags: [],
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
      dialog: false,
    };
  },
  methods: {
    ...mapActions(["fetchPosts"]),
    /**
     * Handle create new post
     */
    async createPost() {
      try {
        let formData = new FormData();
        formData.append("title", this.formData.title);
        formData.append("description", this.formData.description);
        formData.append("body", this.formData.body);
        formData.append("category_id", this.formData.category_id);
        formData.append("thumbnail", this.formData.thumbnail);
        this.formData.tags.forEach((element, index) => {
          formData.append(`tags[${index}]`, element);
        });

        const res = await CreatePost(formData);

        if (res.status === 201) {
          this.errors = {}; // delete all error
          this.snackbar.content = res.data;
          this.snackbar.color = "success";
          this.snackbar.status = true;
          this.formData = {};
          this.dialog = false;
        }
      } catch (e) {
        if (e.response.status === 422) {
          this.status = 422;
          this.errors = e.response.data;
          this.snackbar.color = "red";
          this.snackbar.content = "Failed to post new article";
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

    resetForm() {
      this.formData = {};
      this.errors = {};
    },
  },
};
</script>
