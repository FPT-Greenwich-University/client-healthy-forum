import { checkAuthenticated } from "@/router/guards";
import router from "@/router";

const AuthRoutes = () => {
  return [
    // Login view page
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Auth/Login.vue"),
      beforeEnter: checkAuthenticated,
    },

    /**
     * Register page
     */
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/Auth/Register.vue"),
      beforeEnter: (to, from, next) => {
        // console.log(to)
        if (localStorage.getItem("token") && to.name === "Register") {
          router.go(-1);
        } else {
          next();
        }
      },
    },

    /**
     * Forgot password Form input email page
     */
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: () => import("@/views/Auth/ForgotPassword/ForgotPassword.vue"),
    }, // Reset password form page
    {
      path: "/reset-password",
      name: "ResetPassword",
      component: () => import("@/views/Auth/ForgotPassword/ResetPassword"),
    },

    {
      path: "/verify-account",
      name: "VerifyAccount",
      component: () => import("@/views/Auth/VerifyAccount/VerifyAccount"),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token") && to.name === "VerifyAccount") {
          next({ name: "Home", replace: true });
        } else {
          next();
        }
      },
    },
  ];
};

export default AuthRoutes;
