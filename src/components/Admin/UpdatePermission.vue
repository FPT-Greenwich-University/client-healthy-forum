<template>
  <v-form
      ref="formData"
      class="mt-5"
  >
    <p>Update permission</p>
    <v-select
        v-model="roleIDs"
        :items="roles"
        clearable
        item-text="name"
        item-value="id"
        label="Select Current Roles"
        multiple
        outlined
    >
    </v-select>


    <v-select
        v-if="isExistPermissions"
        v-model="permissionID"
        :items="permissions"
        chips
        clearable
        item-text="name"
        item-value="id"
        label="Select permissions"
        multiple
        outlined
    >
    </v-select>
    <template v-if="error"><p v-if="error.permissions"></p></template>

    <v-btn
        :disabled="!isFormDataValid"
        @click="updatePermissions"
    >
      Update
    </v-btn>
    <v-btn
        class="mx-4"
        color="red"
        outlined
        @click="resetFormData"
    >
      Reset
    </v-btn>

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
  </v-form>
</template>
<script>
import Api from "@/Apis/Api";
import {mapGetters} from "vuex";

export default {
  name: "UpdatePermission",
  props: {
    roles: {
      type: Array,
      required: true,
    },
    userID: {
      type: Number,
      required: true,
    }
  },
  computed: {
    ...mapGetters('AUTH', ['isAdmin']),

    isExistPermissions() {
      return this.permissions.length > 0
    },
    isNotEmptyPermissionIDs() {
      return this.permissionID.length > 0
    },
    isNotEmptyRoleIDs() {
      return this.roleIDs.length > 0
    },
    isFormDataValid() {
      return (this.isNotEmptyPermissionIDs && this.isNotEmptyRoleIDs)
    }
  },
  watch: {
    roleIDs(newValue, oldValue) {
      if (this.isNotEmptyRoleIDs) {
        this.fetchListPermissions()
      }
    }
  },
  data() {
    return {
      roleIDs: [],
      permissions: [],
      permissionID: [],
      snackbar: {
        status: false,
        color: '',
        content: '',
        timeout: 3000,
      },
      error: {},
    }
  }
  ,
  methods: {
    async fetchListPermissions() {
      if (this.isAdmin) {
        try {
          const response = await Api().post(`/admins/permissions`, {role_id: this.roleIDs})

          if (response) {
            this.permissions = response.data
          }
        } catch (error) {
          if (error) {
            console.log('Error fetch permissions', error)
          }
        }
      }
    }
    ,

    async updatePermissions() {
      if (this.isAdmin) {
        let formData = {
          permissions: this.permissionID
        }

        try {
          const response = await Api().put(`/admins/users/${this.userID}/permissions`, formData)

          if (response) {
            this.permissions = []
            this.roleIDs = []
            this.snackbar = {color: 'success', content: response.data, status: true}
            this.$emit('fetch-user-detail') // callback function
          }
        } catch (error) {
          if (error) {
            console.log(error)
            if (error.response.status === 422) {
              this.snackbar = {color: 'red', content: 'Failed update the permissions', status: true}
              this.error = error.response.data
            }
          }
        }
      }
    }
    ,

    resetFormData() {
      this.$refs.formData.reset()
    }
  }
}
</script>