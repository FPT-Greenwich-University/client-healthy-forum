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
        }
    ]
}
export default PostRoutes