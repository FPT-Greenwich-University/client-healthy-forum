import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AuthRoutes from "@/router/modules/AuthRoutes";
import ProfileRoutes from "@/router/modules/Profiles/ProfileRoutes";
import PostRoutes from "@/router/modules/Posts/PostRoutes";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/home",
        name: "HomePage",
        component: () => import("@/views/HomePage")
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
        path: "/users",
        name: "Users",
        component: () => import("../components/Users.vue"),
    },
    {
        path: "/books",
        name: "Books",
        component: () => import("../components/Books.vue"),
    },
    ...AuthRoutes(),
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
