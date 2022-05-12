<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          small
          color="#f44336"
          @click="dialog === true"
          v-bind="attrs"
          v-on="on"
      >
        Delete Post
        <v-icon
            right
            small
            dark
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
</template>
<script>
import {mapActions, mapState} from "vuex";
import router from "@/router";

export default {
  name: "DeletePostButton", // child component of DoctorPost component
  props: {
    postID: {
      required: true,
      type: Number
    }
  },
  computed: {
    ...mapState('AUTH', ['userAuthenticated', 'userRoles'])
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    ...mapActions('POSTS', ['deletePost']),

    async handleDeletePost(postID) {
      if (!(this.userAuthenticated && this.userRoles.includes('doctor'))) {
        return;
      }

      try {
        const response = await this.deletePost({
          postID: postID
        })

        if (response) {
          this.dialog = false
          this.$emit('delete-post')
        }
      } catch (e) {
        console.log('Delete post', e)
      }
    }
  }
}
</script>