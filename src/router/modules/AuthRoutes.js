export default [// @ is a path from src
    // Login
    {
        path: '/login', name: "Login", component: () => import("@/views/Auth/Login.vue")
    }, {
        path: '/register', name: "Register", component: () => import("@/views/Auth/Register.vue")
    }, {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import("@/views/Auth/ForgotPassword/ForgotPassword.vue")
    }, {
        path: '/reset-password',
        name: 'ResetPassword',
        component: () => import("@/views/Auth/ForgotPassword/ResetPassword")
    },
]