export default [
    // Login
    {
        path: '/login',
        name: "Login",
        component: () => import("../../views/Auth/Login.vue")
    },
    {
        path:'/register',
        name:"Register",
        component: () => import("../../views/Auth/Register.vue")
    }
]