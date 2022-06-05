<template>
  <v-row justify="center">
    <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10">
      <v-dialog
          v-model="dialog"
          max-width="290"
          persistent
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              x-small
              color="red"
              v-bind="attrs"
              @click="dialog === true"
              v-on="on"
          >
            Delete Post
            <v-icon
                right
                x-small
            >
              fas fa-trash
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            Are you sure?
          </v-card-title>
          <v-card-text>
            After delete the post will delete all the related information.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
            >
              Disagree
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="handleDeletePost(postID)"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-col>
  </v-row>
</template>
<script>

import router from "@/router";
import {mapActions, mapState} from "vuex";

export default {
  name: "DeletePostButton",
  props: {
    postID: {
      required: true,
      type: Number
    },
  },
  computed: {
    ...mapState('AUTH', ['isAuthenticated', 'userAuthenticated', "userRoles"])
  },

  data() {
    return {
      dialog: false
    }
  },

  methods: {
    ...mapActions('POSTS', ['deletePost']),

    async handleDeletePost(postID) {
      if (!(this.userAuthenticated && this.userRoles.includes('doctor'))) {
        return;
      }

      try {
        const response = this.deletePost({postID})

        if (response) {
          this.dialog = false
          await router.push({name: 'UserProfiles', params: {userID: this.userAuthenticated.id}})
        }
      } catch (e) {
        console.log('Delete post', e)
      }
    }
  }
}
</script>