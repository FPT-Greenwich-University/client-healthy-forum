<template>
  <v-row justify="center">
    <v-col class="col-12 col-xl-5 col-lg-5 col-md-8 col-sm-10">
      <!--   Input content   -->
      <v-textarea
          v-model="content"
          auto-grow
          background-color="grey lighten-5"
          clear-icon="mdi-close-circle"
          clearable
          filled
          label="Comment"
      >
      </v-textarea>

      <!--  Send button    -->
      <v-btn
          color="indigo"
          dark
          elevation="1"
          small
          @click="handleComment"
      >
        Send
        <v-icon right small>fas fa-paper-plane</v-icon>
      </v-btn>

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
          <v-btn
              text
              v-bind="attrs"
              @click="snackbar.status = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

    </v-col>
  </v-row>
</template>
<script>

import Api from "@/Apis/Api";
import {mapActions} from "vuex";

export default {
  name: "FormInputComment",
  props: {
    postID: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      content: '',
      snackbar: {
        status: false,
        color: '',
        content: '',
        timeout: 3000,
      },
      responseText: '',
      errors: {},
    }
  },
  methods: {
    ...mapActions(['fetchComments']),

    async handleComment() {
      try {
        const res = await Api().post(`/posts/${this.postID}/comments`, {
          content: this.content
        })

        if (res) {
          this.errors = {}
          await this.fetchComments(this.postID)
          this.snackbar.content = res.data
          this.snackbar.color = 'success'
          this.snackbar.status = true
          this.content = '' // reset content
        }
      } catch (e) {
        if (e) {
          if (e.response.status === 422) {
            console.log(e.response.data.errors)
            this.errors = e.response.data.errors
            this.snackbar.content = 'Comment failed'
            this.snackbar.color = 'red'
            this.snackbar.status = true
          }
        }
      }
    }
  }
}
</script>
