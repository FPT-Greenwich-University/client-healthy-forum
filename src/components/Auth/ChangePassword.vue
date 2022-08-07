<template>
  <v-dialog v-model="dialog" width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          block
          class="white--text"
          color="DustyRose"
          v-bind="attrs"
          v-on="on"
      >
        Change Password
        <v-icon right x-small> fas fa-lock</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Change current password
      </v-card-title>

      <v-card-text>
        <v-text-field
            v-model="formData.current_password"
            class="ma-4"
            clearable
            filled
            label="Current password"
        ></v-text-field>
        <p v-if="errors.current_password" class="mx-4 red--text">
          {{ errors.current_password[0] }}
        </p>

        <v-text-field
            v-model="formData.password"
            class="ma-4"
            clearable
            filled
            label="New password"
        ></v-text-field>
        <p v-if="errors.password" class="mx-4 red--text">
          {{ errors.password[0] }}
        </p>

        <v-text-field
            v-model="formData.password_confirmation"
            class="ma-4"
            clearable
            filled
            label="New password confirm"
        ></v-text-field>
        <p class="text-center text-h6 green--text">{{ successMessage }}</p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="success" text @click="updatePassword">
          Accept change
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeDialog"> Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
/**
 * Api call
 */
import {UpdatePassword} from "@/Apis/HealthyFormWebApi/AuthApi/AuthApi";

/**
 * Vue x
 */
import {mapState} from "vuex";

export default {
  name: "ChangePassword",
  computed: {
    ...mapState("AUTH", ["userAuthenticated"]),
  },
  data() {
    return {
      dialog: false,
      formData: {
        current_password: "",
        password: "",
        password_confirmation: "",
      },
      errors: {},
      successMessage: "",
    };
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.errors = {};
      this.successMessage = "";
      this.formData = {};
    },

    async updatePassword() {
      try {
        const userId = this.userAuthenticated.id;

        await UpdatePassword(userId, this.formData);

        this.successMessage = "Update password success!";
        this.errors = {}; // Reset error state
      } catch (error) {
        if (error.response.status === 422) {
          this.errors = error.response.data.errors;
          this.successMessage = "";
        }

        if (error.response.status === 400) {
          this.successMessage = "";
          this.errors = {};
          this.errors.current_password = [];
          this.errors.current_password[0] = "Password is not correctly!";
        }
      }
    },
  },
};
</script>

<style scoped></style>