import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AuthRoutes from "@/router/modules/AuthRoutes";
import ProfileRoutes from "@/router/modules/Profiles/ProfileRoutes";
import PostRoutes from "@/router/modules/Posts/PostRoutes";
import AdminRoutes from "@/router/modules/Admin/AdminRoutes";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },

    {
        path: "/search",
        name: "Search",
        component:()=> import("@/views/Search.vue")
    },

    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },

    ...AuthRoutes(),
    ...AdminRoutes(),
    ...ProfileRoutes(),
    ...PostRoutes(),
    {
        path: "*",
        name: "NotFounds",
        component: () => import("@/views/NotFound")
    }
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
