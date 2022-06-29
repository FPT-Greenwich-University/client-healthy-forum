const Favorites = () => {
  return [
    {
      path: "/users/favorites/doctors",
      name: "DoctorFavoriteList",
      component: () => import("@/views/Favorites/Doctors/ListDoctorFavorites"),
    },
    {
      path: "/users/favorites/posts",
      name: "PostFavoriteList",
      component: () => import("@/views/Favorites/Posts/ListPostFavorites"),
    },
  ];
};
export default Favorites;
