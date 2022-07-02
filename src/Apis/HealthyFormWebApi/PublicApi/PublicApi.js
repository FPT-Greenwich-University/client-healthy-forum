import HealthyFormWebApi from "../HealthyFormWebApi";

// Public resource api
const GetPublishedPosts = (page) => {
  return HealthyFormWebApi().get(`/posts?page=${page}`);
};

const GetDetailPost = (postId) => {
  return HealthyFormWebApi().get(`/posts/${postId}`);
};
/**
 * Get tags by post
 */
const GetTagsByPost = (postID) => {
  return HealthyFormWebApi().get(`/posts/${postID}/tags`);
};
const GetTotalLikeOfPost = (postID) => {
  return HealthyFormWebApi().get(`/posts/${postID}/tags`);
};
const GetCommentsByPost = (payload) => {
  return HealthyFormWebApi().get(
    `posts/${payload.postID}/comments?page=${payload.page}`
  );
};

const GetPostsByTag = (page, tagId) => {
  return HealthyFormWebApi().get(`/posts?tag=${tagId}&page=${page}`);
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
  GetPostsByTag,
  GetCommentsByPost,
  GetDetailPost,
  GetCategories,
  GetTags,
  GetTotalLikeOfPost,
  GetTagsByPost,
  GetPublishedPosts,
  GetCites,
  GetDistricts,
  SearchPosts,
  GetWards,
  FilterPosts,
};
