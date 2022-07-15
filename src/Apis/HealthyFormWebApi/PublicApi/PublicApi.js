import HealthyFormWebApi from "../HealthyFormWebApi";

// Public resource api

const GetPublishedPostsByUser = (userId, page) => {
  return HealthyFormWebApi().get(
    `/users/${userId}/published-posts?page=${page}`
  );
};

const GetRelatedPostsByCategory = (categoryId) => {
  return HealthyFormWebApi().get(`/related-posts/${categoryId}`);
};

const GetDetailPost = (postId) => {
  return HealthyFormWebApi().get(`/posts/${postId}`);
};
/**
 * Get tags by post
 */
const GetTagsByPost = (postId) => {
  return HealthyFormWebApi().get(`/posts/${postId}/tags`);
};
const GetTotalLikeOfPost = (postId) => {
  return HealthyFormWebApi().get(`/posts/${postId}/total-likes`);
};
const GetCommentsByPost = (payload) => {
  return HealthyFormWebApi().get(
    `posts/${payload.postId}/comments?page=${payload.page}`
  );
};

const GetPostByCategory = (page, categoryId) => {
  return HealthyFormWebApi().get(
    `/posts?filter[category_id]=${categoryId}&page=${page}`
  );
};

const GetPostsByTag = (page, tagId) => {
  return HealthyFormWebApi().get(`/posts?filter[tag_id]=${tagId}&page=${page}`);
};

const GetCategories = () => {
  return HealthyFormWebApi().get("/categories");
};

/**
 * Get user profile
 */
const GetUserProfile = (userId) => {
  return HealthyFormWebApi().get(`/users/${userId}/profiles`);
};

const SearchPosts = (title, page) => {
  return HealthyFormWebApi().get(`/search?title=${title}&page=${page}`);
};

const GetCites = () => {
  return HealthyFormWebApi().get("/public/cities");
};

const GetDistricts = (cityID) => {
  return HealthyFormWebApi().get(`/public/cities/${cityID}/districts`);
};

const GetWards = (districtID) => {
  return HealthyFormWebApi().get(`/public/districts/${districtID}/wards`);
};

const GetTags = () => {
  return HealthyFormWebApi().get("/tags");
};

const FilterPosts = (categoryId, tagId, page) => {
  if (categoryId && tagId) {
    return HealthyFormWebApi().get(
      `/posts?filter[category_id]=${categoryId}&filter[tag_id]=${tagId}&page=${page}`
    );
  }

  if (categoryId) {
    return HealthyFormWebApi().get(
      `/posts?filter[category_id]=${categoryId}&page=${page}`
    );
  } else if (tagId) {
    return HealthyFormWebApi().get(
      `/posts?filter[tag_id]=${tagId}&page=${page}`
    );
  } else {
    return HealthyFormWebApi().get(`/posts?page=${page}`);
  }
};

export {
  GetUserProfile,
  GetPublishedPostsByUser,
  GetRelatedPostsByCategory,
  GetPostByCategory,
  GetPostsByTag,
  GetCommentsByPost,
  GetDetailPost,
  GetCategories,
  GetTags,
  GetTotalLikeOfPost,
  GetTagsByPost,
  GetCites,
  GetDistricts,
  SearchPosts,
  GetWards,
  FilterPosts,
};
