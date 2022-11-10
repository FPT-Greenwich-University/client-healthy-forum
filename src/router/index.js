import Vue from "vue";
import VueRouter from "vue-router";
import AuthRoutes from "@/router/modules/AuthRoutes";
import ProfileRoutes from "@/router/modules/Profiles/ProfileRoutes";
import PostRoutes from "@/router/modules/Posts/PostRoutes";
import AdminRoutes from "@/router/modules/Admin/AdminRoutes";
import Favorites from "@/router/modules/Users/Favorites";
import { checkAuthenticated } from "@/router/guards";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home"),
  },

  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/Search"),
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },

  {
    path: "/chat",
    name: "Chat",
    component: () => import("@/views/Chat/Chat"),
    beforeEnter: checkAuthenticated,
  },

  {
    path: "/video-call",
    name: "CometVideoCall",
    component: () => import("@/views/VideoCall/CometVideoCall"),
    beforeEnter: checkAuthenticated,
  },

  {
    path: "/notification",
    name: "Notification",
    component: () => import("@/views/Notification"),
    beforeEnter: checkAuthenticated,
  },

  // 404 not found page
  {
    path: "*",
    name: "NotFounds",
    component: () => import("@/views/NotFound"),
  },

  ...AuthRoutes(),
  ...AdminRoutes(),
  ...ProfileRoutes(),
  ...PostRoutes(),
  ...Favorites(),
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
