import {checkAuthenticated } from "@/router/guards";

const AuthRoutes = () => {
    return [
        // Login view page
        {
            path: '/login',
            name: "Login",
            component: () => import("@/views/Auth/Login.vue"),
            beforeEnter: checkAuthenticated
        },
        // Register page
        {
            path: '/register',
            name: "Register",
            component: () => import("@/views/Auth/Register.vue")
        },
        // Forgot password form page
        {
            path: '/forgot-password',
            name: 'ForgotPassword',
            component: () => import("@/views/Auth/ForgotPassword/ForgotPassword.vue")
        },
        // Reset password form page
        {
            path: '/reset-password',
            name: 'ResetPassword',
            component: () => import("@/views/Auth/ForgotPassword/ResetPassword")
        },
    ]
}

export default AuthRoutes