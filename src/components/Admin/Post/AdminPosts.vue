<template>
  <v-container>
    <v-row v-if="posts.length > 0">
      <v-col>
        <v-card>
          <v-card-title class="text-capitalize">Posts article</v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Title</th>
                  <th class="text-left">User</th>
                  <th class="text-left">Category</th>
                  <th class="text-left">Published</th>
                  <th colspan="3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in posts" :key="item.id">
                  <td>{{ item.title }}</td>
                  <td>{{ item.user.name }}</td>
                  <td>{{ item.category.name }}</td>
                  <td>{{ item.is_published ? "Yes" : "No" }}</td>
                  <td>
                    <DetailPost
                      :postID="item.id"
                      @update-status="fetchPostWhereNotPublish"
                    />
                  </td>
                  <td>
                    <DeletePost
                      :postID="item.id"
                      @delete-post="fetchPostWhereNotPublish()"
                    />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <Paginate @change-page="fetchPostWhereNotPublish" />
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col> No posts</v-col>
    </v-row>
  </v-container>
</template>
<script>
import {
  GetNotPublishedPosts,
  GetPostsMostLike,
} from "@/Apis/HealthyFormWebApi";
import Paginate from "@/components/Paginate";
import DetailPost from "@/components/Admin/Post/DetailPost";
import DeletePost from "@/components/Admin/Post/DeletePost";

export default {
  name: "Posts",
  components: {
    DetailPost,
    DeletePost,
    Paginate,
  },
  watch: {
    PostWhereNotPublish: {
      handler() {
        this.fetchPostWhereNotPublish();
      },
      immediate: true,
    },
  },
  data() {
    return {
      posts: [],
      search: "",
      snackbar: false,
      snackbarContent: "",
    };
  },
  methods: {
    async fetchPostWhereNotPublish(page = 1) {
      try {
        const res = await GetNotPublishedPosts(page);

        this.posts = res.data.data;
        this.$store.commit("setCurrentPage", res.data.current_page);
        this.$store.commit("setLastPage", res.data.last_page);
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    },

    async fetchPostsMostLiked(page) {
      try {
        const res = await GetPostsMostLike(page);

        this.posts = res.data.data;
        this.$store.commit("setCurrentPage", res.data.current_page);
        this.$store.commit("setLastPage", res.data.last_page);
      } catch (e) {
        if (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>
