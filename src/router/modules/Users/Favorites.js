import { checkAuthenticated } from "@/router/guards";

const Favorites = () => {
  return [
    {
      path: "/users/favorite-doctors",
      name: "DoctorFavoriteList",
      component: () => import("@/views/Favorites/Doctors/ListDoctorFavorites"),
      beforeEnter: checkAuthenticated,
    },
    {
      path: "/users/favorite-posts",
      name: "PostFavoriteList",
      component: () => import("@/views/Favorites/Posts/ListPostFavorites"),
      beforeEnter: checkAuthenticated,
    },
  ];
};
export default Favorites;
