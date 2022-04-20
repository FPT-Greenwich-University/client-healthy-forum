const ProfileRoutes = () => {
    return [{
        path: '/users/:userID',
        name: "UserProfiles",
        component: () => import("@/views/Users/Profiles/UserProfiles"),
    },
    ]
}
export default ProfileRoutes