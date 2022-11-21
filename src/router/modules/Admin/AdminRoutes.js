import { checkIsAdmin } from "@/router/guards";

const AdminRoutes = () => {
  return [
    {
      path: "/admins/dashboard",
      name: "AdminDashBoard",
      component: () => import("@/views/Admins/TheDashboard"),
      beforeEnter: checkIsAdmin,
    },
    {
      path: "/admins/posts",
      name: "AdminPosts",
      component: () => import("@/components/Admin/Post/AdminPosts"),
      beforeEnter: checkIsAdmin,
    },
  ];
};

export default AdminRoutes;
