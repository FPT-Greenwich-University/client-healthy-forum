<template>
  <v-container class="user-profile">
    <!--  Top profile  -->
    <v-row>
      <v-col class="col-12" transition="slide-x-transition">
        <v-card

            class="mt-2"
            color="#26c6da"
            dark
        >
          <v-card-title>
            <v-icon
                large
                left
            >
              mdi-twitter
            </v-icon>
            <span class="text-h6 font-weight-light">Twitter</span>
          </v-card-title>

          <v-card-text v-if="userInfo.profile" class="text-h5 font-weight-bold">
            {{ userInfo.profile.description }}
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <!--  if user is google account-->
              <v-list-item-avatar v-if="userInfo.provider_id !== null" color="grey darken-3">
                <v-img
                    :src="userInfo.image_url"
                    alt=""
                    class="elevation-6"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-avatar color="grey darken-3" v-else>
                <v-img
                    src="https://kenh14cdn.com/2018/10/19/photo-1-15399608173151918722731.png"
                    alt=""
                    class="elevation-6"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ userInfo.name }}</v-list-item-title>
              </v-list-item-content>

              <v-row
                  align="center"
                  justify="end"
              >
                <v-icon class="mr-1">
                  mdi-heart
                </v-icon>
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">
                  mdi-share-variant
                </v-icon>
                <span class="subheading">45</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>


    <v-divider class="my-5"></v-divider>

    <v-row>
      <v-col class="col-5">
        <v-card id="introduce">
          <v-card-title>Introduce</v-card-title>
          <v-card-actions>
            <ChangeProfile @update-profile="fetchProfile"/>
          </v-card-actions>
          <!--          <v-divider class="m-4"></v-divider>-->
          <v-card-text v-if="userInfo.profile !== null">
            <p>Live at <span class="font-weight-bold">{{ fullAddress }}</span></p>
            <p>Join at <span class="font-weight-bold">{{ userInfo.created_at }}</span></p>
            <p>Have <span class="font-weight-bold">1K</span> follower</p>
          </v-card-text>
          <v-card-text v-else>
            <p>No information</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="col-7">
        <v-card>
          <v-card-title>Post articles</v-card-title>
        </v-card>
        <v-divider class="my-5"></v-divider>
        <!--        List all posts-->
        <v-card>
          <v-card-text>
            <v-img class="rounded"
                   src="https://cafefcdn.com/zoom/260_162/2019/5/5/herbalife-sxsw-blog-640x360-15570277360691388640197-crop-15570277426911668808992.jpg">
            </v-img>
            <p class="font-weight-bold mt-5">Tile of post</p>
            <p>Rating: 4.5</p>
            <p>Like: 55</p>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-text>
            <v-img class="rounded"
                   src="https://cafefcdn.com/zoom/260_162/2019/5/5/herbalife-sxsw-blog-640x360-15570277360691388640197-crop-15570277426911668808992.jpg">
            </v-img>
            <p class="font-weight-bold mt-5">Tile of post</p>
            <p>Rating: 4.5</p>
            <p>Like: 55</p>
          </v-card-text>
        </v-card>

        <v-card>
          <v-card-text>
            <v-img class="rounded"
                   src="https://cafefcdn.com/zoom/260_162/2019/5/5/herbalife-sxsw-blog-640x360-15570277360691388640197-crop-15570277426911668808992.jpg">
            </v-img>
            <p class="font-weight-bold mt-5">Tile of post</p>
            <p>Rating: 4.5</p>
            <p>Like: 55</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// Change profile form component
import ChangeProfile from "@/views/Users/Profiles/ChangeProfile";
// Api
import Api from "@/Apis/Api";

export default {
  name: "UserProfile",
  components: {
    ChangeProfile
  },
  data() {
    return {
      userInfo: {},
    }
  },
  computed: {
    fullAddress() {
      if (this.userInfo.profile) {
        return `${this.userInfo.profile.city}, ${this.userInfo.profile.district}, ${this.userInfo.profile.ward}`
      } else {
        return ''
      }
    }
  },
  watch: {
    handleFetchProfile: {
      handler() {
        this.fetchProfile()
      },
      immediate: true
    }
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await Api().get('/users/profiles')
        // console.log('user profile:', response.data);
        this.userInfo = response.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped>
.user-profile {
}

#introduce {
  position: sticky;
  top: 64px;
}
</style>