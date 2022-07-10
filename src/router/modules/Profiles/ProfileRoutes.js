const ProfileRoutes = () => {
  return [
    {
      path: "/users/:userId/profiles",
      name: "UserProfiles",
      component: () => import("@/views/Users/Profiles/UserProfiles"),
    },
  ];
};
export default ProfileRoutes;
