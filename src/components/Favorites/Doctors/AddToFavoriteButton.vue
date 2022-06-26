<template>
  <v-container v-if="isAuthenticated">
    <v-row>
      <v-col>
        <v-btn
            :color="followStatus.color"
            block
            class="text-caption text-xl-subtitle-1 text-lg-subtitle-1 d-none d-xl-block d-lg-block d-md-block d-sm-block"
            dark
            elevation="2"
            @click="isFollowed ? unFollow(userID, doctorID) : addFollow(doctorID)"
        >
          {{ followStatus.message }}
          <v-icon
              dark
              small>
            {{ followStatus.icon }}
          </v-icon>
        </v-btn>
        <v-btn
            :color="followStatus.color"
            class="d-block d-xl-none d-lg-none d-md-none d-sm-none"
            dark
            fab
            x-small
            @click="isFollowed ? unFollow(userID, doctorID) : addFollow(doctorID)"
        >
          <v-icon dark>
            {{ followStatus.icon }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Api from "@/Apis/Api";
import {mapState} from "vuex";

export default {
  name: "AddToFavoriteButton",
  computed: {
    ...mapState('AUTH', ['userAuthenticated', "isAuthenticated"]),

    isFollowed() {
      return this.followStatus.status
    }
  },
  watch: {
    handleCheckFollow: {
      handler() {
        if (this.isAuthenticated) {
          this.userID = this.userAuthenticated.id

          if (this.userID !== undefined) {
            this.checkFollow(this.userAuthenticated.id, this.doctorID)
          }
        }
      },

      immediate: true
    }
  },
  data() {
    return {
      doctorID: this.$route.params.userID,
      userID: undefined,
      followStatus: {
        status: false,
        message: '',
        color: '',
        icon: ''
      },
    }
  },
  methods: {
    /**
     * Handle add doctor to a favorite list
     *
     * @param doctorID
     * @returns {Promise<void>}
     */
    async addFollow(doctorID) {
      try {
        const response = await Api().post('/users/favorites/doctors', {doctor_id: doctorID})

        if (response) {
          await this.checkFollow(this.userAuthenticated.id, doctorID)
        }
      } catch (error) {
        console.log(error)
      }
    },

    async unFollow(userID, doctorID) {
      try {
        const response = await Api().delete(`/users/${userID}/favorites/doctors/${doctorID}`)

        console.log(response)
        if (response) {
          await this.checkFollow(this.userAuthenticated.id, doctorID)
        }
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * If doctor in list favorite, then return true
     * otherwise false
     *
     * @param userID
     * @param doctorID
     * @returns {Promise<void>}
     */
    async checkFollow(userID, doctorID) {
      try {
        const response = await Api().get(`/users/${userID}/favorites/doctors/${doctorID}`)
        console.log('check', response)

        if (response) {
          if (response.data === false) {

            this.followStatus = {status: false, message: "Follow", color: 'primary', icon: "fas fa-heart"}
          } else {
            this.followStatus = {status: true, message: "Unfollow", color: 'red', icon: "fas fa-unlink"}
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>

<style scoped>

</style>