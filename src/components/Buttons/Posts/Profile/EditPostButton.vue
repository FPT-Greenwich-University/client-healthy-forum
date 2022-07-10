<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark plain small text v-bind="attrs" v-on="on">
          Edit Post
          <v-icon dark right small> mdi-pencil </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar color="primary" dark>
          <v-btn dark icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <!--   Form edit   -->
        <EditPost :postId="postId" />
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState } from "vuex";
import EditPost from "@/views/Posts/Doctors/EditPost";

export default {
  name: "EditPostButton", // child component of DoctorPost component
  props: {
    postId: {
      required: true,
      type: Number,
    },
  },
  components: { EditPost },
  computed: {
    ...mapState("AUTH", ["userAuthenticated", "userRoles"]),
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {},
};
</script>
