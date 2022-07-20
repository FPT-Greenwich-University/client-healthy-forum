<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" text v-bind="attrs" v-on="on">
          Change Password
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

          <v-text-field
            v-model="formData.password"
            class="ma-4"
            clearable
            filled
            label="New password"
          ></v-text-field>

          <v-text-field
            v-model="formData.password_confirmation"
            class="ma-4"
            clearable
            filled
            label="New password confirm"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="success" text @click="updatePassword">
            Accept change
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "ChangePassword",
  data() {
    return {
      dialog: false,
      formData: {
        current_password: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    async updatePassword() {
      try {
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
