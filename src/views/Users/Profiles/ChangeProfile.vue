<template>
  <v-dialog v-model="dialog" width="800px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          block
          class="mb-2 text-caption text-xl-subtitle-1 text-lg-subtitle-1 d-none d-xl-block d-lg-block d-md-block d-sm-block white--text"
          color="blackBrown"
          v-bind="attrs"
          v-on="on"
      >
        Change Information
        <v-icon right> fas fa-address-card</v-icon>
      </v-btn>
      <v-btn
          class="mx-2 mb-2 d-block d-xl-none d-lg-none d-md-none d-sm-none"
          color="cyan"
          dark
          fab
          v-bind="attrs"
          x-small
          v-on="on"
      >
        <v-icon> mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                  v-model="firstName"
                  hint="example: Phuoc"
                  label="Legal first name*"
                  required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                  v-model="middleName"
                  hint="example: Ngoc"
                  label="Legal middle name"
                  required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-text-field
                  v-model="lastName"
                  hint="example: Tran"
                  label="Legal last name*"
                  required
              ></v-text-field>
            </v-col>
            <v-col cols="12"
            ><small>{{ fullName }}</small></v-col
            >
            <v-col cols="12">
              <v-textarea v-model="description" color="teal">
                <template v-slot:label>
                  <div>Bio <small>(optional)</small></div>
                </template>
              </v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  v-model="phone"
                  hint="example: 099999999"
                  label="Phone*"
                  required
              ></v-text-field>
              <small v-if="errorResponse.phone" class="red--text">{{
                  errorResponse.phone[0]
                }}</small>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-select
                  v-model="city"
                  :items="apiCities"
                  item-text="title"
                  item-value="title"
                  label="City*"
                  required
              ></v-select>
              {{ city }}
              <small v-if="errorResponse.city" class="red--text">{{
                  errorResponse.city[0]
                }}</small>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-select
                  v-model="district"
                  :items="apiDistricts"
                  item-text="title"
                  item-value="title"
                  label="District*"
                  required
              ></v-select>
              <small v-if="errorResponse.district" class="red--text" cols="12">
                {{ errorResponse.district[0] }}
              </small>
            </v-col>
            <v-col cols="12" md="4" sm="6">
              <v-select
                  v-model="ward"
                  :items="apiWards"
                  item-text="title"
                  item-value="title"
                  label="Ward*"
                  required
              ></v-select>
              <small v-if="errorResponse.ward" class="red--text">{{
                  errorResponse.ward[0]
                }}</small>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  v-model="street"
                  hint="example: 213 Cua Dai"
                  label="Street*"
                  required
                  type="text"
              ></v-text-field>
              <small v-if="errorResponse.street" class="red--text">{{
                  errorResponse.street[0]
                }}</small>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                  v-model.number="age"
                  hint="example: 35"
                  label="Age*"
                  required
                  type="text"
              ></v-text-field>
              <small v-if="errorResponse.age" class="red--text">{{
                  errorResponse.age[0]
                }}</small>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                  v-model="gender"
                  :items="genders"
                  item-text="title"
                  item-value="value"
                  label="Gender*"
              ></v-select>
              <small v-if="errorResponse.gender" class="red--text">{{
                  errorResponse.gender[0]
                }}</small>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="handleUpdateProfile">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {UpdateProfile} from "@/Apis/HealthyFormWebApi/AuthApi/AuthApi";
import {
  GetCites,
  GetDistricts,
  GetWards,
} from "@/Apis/HealthyFormWebApi/PublicApi/PublicApi";

export default {
  name: "ChangeProfile",
  data() {
    return {
      apiCities: [],
      apiDistricts: [],
      apiWards: [],
      genders: [
        {value: 0, title: "Male"},
        {value: 1, title: "Female"},
      ],
      firstName: "",
      middleName: "",
      lastName: "",
      description: "",
      phone: "",
      gender: "",
      age: "",
      city: "",
      district: "",
      ward: "",
      street: "",

      dialog: false, // dialog component
      errorResponse: {}, // Response data error object
    };
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.middleName} ${this.lastName}`;
    },
  },
  watch: {
    city: {
      handler() {
        this.fetchApiCities();
        if (this.city.length !== 0) {
          let result = this.apiCities.filter((e) => e.title === this.city);
          // console.log('Find city:', result[0])
          this.fetchApiDistricts(result[0].id);
        }
      },
      immediate: true,
    },
    district: {
      handler() {
        if (this.district.length !== 0) {
          let result = this.apiDistricts.filter(
              (e) => e.title === this.district
          );
          // console.log('find districts', result);
          this.fetchApiWards(result[0].id);
        }
      },
      deep: true,
    },
  },
  methods: {
    // call api to get all cities
    async fetchApiCities() {
      try {
        const response = await GetCites();

        this.apiCities = response.data.LtsItem.map((e) => {
          return {
            id: e.ID,
            title: e.Title,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },

    //  call api to get district of city
    async fetchApiDistricts(cityID) {
      try {
        const response = await GetDistricts(cityID);
        this.apiDistricts = response.data.map((e) => {
          return {
            id: e.ID,
            title: e.Title,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },

    //  call api to get wards
    async fetchApiWards(districtID) {
      try {
        const response = await GetWards(districtID);
        this.apiWards = response.data.map((e) => {
          return {
            id: e.ID,
            title: e.Title,
          };
        });
      } catch (error) {
        console.log(error);
      }
    },

    getFormData() {
      let formData = {
        phone: this.phone,
        age: this.age,
        gender: this.gender,
        city: this.city,
        district: this.district,
        ward: this.ward,
        street: this.street,
      };

      if (this.description.length !== 0) {
        formData.description = this.description;
      }
      return formData;
    },

    // Update user profile
    async handleUpdateProfile() {
      let formData = this.getFormData();
      const userId = this.$route.params.userId;

      try {
        await UpdateProfile(userId, formData);
        this.dialog = false;
        this.errorResponse = {};
        this.$emit("update-profile", userId); // Listen event call back to update profile in vuex
      } catch (error) {
        if (error.response.status === 422) {
          this.errorResponse = error.response.data;
        }
      }
    },
  },
};
</script>