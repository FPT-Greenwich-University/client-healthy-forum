import {checkAuthenticated, checkIsDoctor} from "@/router/guards";

const PostRoutes = () => {
    return [
        /**
         * List all the posts
         */
        {
            path: '/posts',
            name: 'Posts',
            component: () => import('@/views/Posts/Public/ThePosts')
        },


        /**
         * Detail the post
         */
        {
            path: '/posts/:postID',
            name: 'ThePostDetails',
            component: () => import('@/views/Posts/Public/ThePostDetails')
        },

        /**
         * Create new post
         */
        {
            path: '/doctors/posts/create',
            name: "CreatePost",
            beforeEnter: checkIsDoctor,
            component: () => import('@/views/Posts/Doctors/CreatePost')
        },

        /**
         * List the posts by tag
         */
        {
            path: '/posts/tags/:tagID',
            name: "PostsByTag",
            beforeEnter: checkAuthenticated,
            component: () => import('@/views/Posts/Public/ThePosts')
        },

    ]
}
export default PostRoutes