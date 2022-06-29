<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog max-width="600" transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" plain text v-bind="attrs" v-on="on"
            >Register as a doctor
          </v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar class="text-capitalize" color="primary" dark>
              register as a doctor
            </v-toolbar>
            <v-card-text>
              <div class="text-sm-body-1 pa-12">
                As a doctor, you can post the article on website for sharing
                your knowledge about healthy life care. You need to read the
                website's regulations to avoid violations.
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
              <v-btn :disabled="invalid" @click="handleRegisterDoctorRole">
                Agree
              </v-btn>
            </v-card-actions>
            <v-card-text v-if="responseText" class="green--text"
              >{{ responseText }}
            </v-card-text>
            <v-card-text v-if="error" class="red--text"
              >{{ error.text }}
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import HealthyFormWebApi from "@/Apis/HealthyFormWebApi/HealthyFormWebApi";

export default {
  name: "RegisterDoctorButton",
  data() {
    return {
      error: {},
      responseText: "",
      invalid: false,
    };
  },
  methods: {
    async handleRegisterDoctorRole() {
      try {
        const res = await HealthyFormWebApi().post(`register/doctor-role`);

        if (res) {
          this.responseText = res.data;
          this.errors = {};
          this.invalid = true;
        }
      } catch (e) {
        if (e) {
          this.error = {
            text: e.response.data,
          };
          this.invalid = false;
        }
      }
    },
  },
};
</script>
