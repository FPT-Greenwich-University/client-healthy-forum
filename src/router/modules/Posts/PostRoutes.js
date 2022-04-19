const PostRoutes = () => {
    return [
        {
            path: '/posts',
            name: 'Posts',
            component: () => import('@/views/Posts/Public/ThePosts')
        },

        // Detail post
        {
            path: '/posts/:postID',
            name: 'ThePostDetails',
            component: () => import('@/views/Posts/Public/ThePostDetails')
        },

        // List the posts by tag
        {
            path: '/posts/tags/:tagID',
            name: "PostsByTag",
            component: () => import('@/views/Posts/Public/ThePosts')
        },


    ]
}
    export default PostRoutes