<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mb-5"
          color="primary lighten-2"
          dark
          small
          v-bind="attrs"
          v-on="on"
        >
          Contract
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Contract doctor name
        </v-card-title>

        <v-card-text>
          <!--   Title input    -->
          <v-text-field
            v-model="formContract.title"
            class="ma-4"
            clearable
            filled
            label="Title"
            placeholder="The email title"
          ></v-text-field>
          <p v-if="errors.title" class="red--text mx-4">
            {{ errors.title[0] }}
          </p>
          <!--    Body input    -->
          <v-textarea
            v-model="formContract.body"
            class="ma-4"
            clear-icon="mdi-close-circle"
            clearable
            filled
            label="Body content"
            placeholder="The content of email"
          ></v-textarea>
          <p v-if="errors.body" class="red--text mx-4">{{ errors.body[0] }}</p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red lighten-2" text @click="cancelContract">
            Cancel
          </v-btn>
          <v-btn color="primary" text @click="sendEmail"> Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  </div>
</template>

<script>
import { SendMailContract } from "@/Apis/HealthyFormWebApi/MailApi/MailApi";
import { mapState } from "vuex";

export default {
  name: "ContractDoctor",
  props: {
    doctorEmail: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
  },
  data() {
    return {
      dialog: false,
      formContract: {
        title: "",
        body: "",
        from_email: "", // User send email
        from_user_name: "", // User's name who is sending email
        receiver_email: "", // User receive email
      },
      snackbar: {
        status: false,
        color: "",
        content: "",
        timeout: 3000,
      },
      errors: {},
    };
  },
  methods: {
    cancelContract() {
      this.formContract = {};
      this.dialog = false;
    },

    async sendEmail() {
      try {
        this.formContract.receiver_email = this.doctorEmail;
        this.formContract.from_email = this.userAuthenticated.email;
        this.formContract.from_user_name = this.userAuthenticated.name;

        const response = await SendMailContract(this.formContract);

        if (response.status === 201) {
          this.formContract = {};
          this.dialog = false;
          this.errors = {}; // delete all error
          this.snackbar.content = response.data;
          this.dialog = false;
          this.formData = {};
          this.snackbar = {
            color: "green",
            content: response.data,
            status: true,
            timeout: 3000,
          };
        }
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data;
          this.snackbar = {
            color: "red",
            content: "Failed to send mail contract",
            status: true,
            timeout: 3000,
          };
        }
      }
    },
  },
};
</script>

<style scoped></style>
