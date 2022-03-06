import {checkAuthenticated} from "@/router/guards";

const ProfileRoutes = () => {
    return [{
        path: '/profiles',
        name: "UserProfiles",
        component: () => import("@/views/Users/Profiles/UserProfiles"),
        beforeEnter: checkAuthenticated
    },
    ]
}
export default ProfileRoutes