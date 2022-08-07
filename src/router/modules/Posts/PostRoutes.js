import { checkAuthenticated, checkIsDoctor } from "@/router/guards";

const PostRoutes = () => {
  return [
    /**
     * Create new post
     */
    {
      path: "/posts/create",
      name: "CreatePost",
      beforeEnter: checkIsDoctor,
      component: () => import("@/views/Posts/Doctors/CreatePost"),
    },

    /**
     * List all the posts
     */
    {
      path: "/posts",
      name: "Posts",
      component: () => import("@/views/Posts/Public/ThePosts"),
    },

    /**
     * Detail the post
     */
    {
      path: "/posts/:postId",
      name: "ThePostDetails",
      component: () => import("@/views/Posts/Public/ThePostDetails"),
    },

    {
      path: "/users/:userId/my-posts",
      name: "TheDoctorPosts",
      component: () => import("@/views/Doctors/TheDoctorPosts"),
    },

    /**
     * Doctor detail their post
     */
    {
      path: "/users/:userId/my-posts/:postId",
      name: "TheDoctorPostDetails",
      component: () => import("@/views/Posts/Public/ThePostDetails"),
      beforeEnter: checkIsDoctor,
    },

    /**
     * List the posts by tag
     */
    {
      path: "/posts/tags/:tagId",
      name: "PostsByTag",
      beforeEnter: checkAuthenticated,
      component: () => import("@/views/Posts/Public/ThePosts"),
    },
  ];
};
export default PostRoutes;
