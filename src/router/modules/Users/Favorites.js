const Favorites = () => {
    return [
        {
            path: "/users/favorites/doctors",
            name: "DoctorFavoriteList",
            component: () => import("@/views/Favorites/Doctors/ListDoctorFavorites")
        }
    ]
}
export default Favorites