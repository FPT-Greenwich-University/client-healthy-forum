import store from "@/store";

const AdminRoutes = () => {
    return [
        {
            path: '/admins/dashboard',
            name: 'AdminDashBoard',
            component: () => import('@/views/Admins/TheDashboard'),
            beforeEnter: (to, from, next) => {
                if (store.state.AUTH.isAuthenticated && store.state.AUTH.userRoles.includes('admin')) next()
                else next(false)
            }
        },
        {
            path: '/admins/posts',
            name: 'AdminPosts',
            component: () => import('@/components/Admin/Post/AdminPosts'),
        },
    ]
}

export default AdminRoutes