<template>
  <v-container>
    <v-row justify="center">
      <v-col class="col-12">
        <v-tabs center-active centered>
          <v-tab @click="changeComponent('SearchPosts')">Posts</v-tab>
          <v-tab @click="changeComponent('SearchUsers')">Users</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <!-- Dynamic component -->
    <keep-alive>
      <component :is="isCurrentTabComponent"></component>
    </keep-alive>
  </v-container>
</template>
<script>
import SearchPosts from "@/components/Search/SearchPosts";
import SearchUsers from "@/components/Search/SearchUsers";

export default {
  name: "Search",
  components: { SearchPosts, SearchUsers },
  data() {
    return {
      isCurrentTabComponent: "SearchPosts", // Default component render
    };
  },
  methods: {
    changeComponent(componentName) {
      this.isCurrentTabComponent = componentName;
    },
  },
};
</script>