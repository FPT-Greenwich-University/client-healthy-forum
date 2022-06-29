import store from "@/store";
import router from "@/router";

const AdminRoutes = () => {
  return [
    {
      path: "/admins/dashboard",
      name: "AdminDashBoard",
      component: () => import("@/views/Admins/TheDashboard"),
      beforeEnter: (to, from, next) => {
        if (
          store.state.AUTH.isAuthenticated &&
          store.state.AUTH.userRoles.includes("admin")
        )
          next();
        else router.go(-1);
      },
    },
    {
      path: "/admins/posts",
      name: "AdminPosts",
      component: () => import("@/components/Admin/Post/AdminPosts"),
    },
  ];
};

export default AdminRoutes;
