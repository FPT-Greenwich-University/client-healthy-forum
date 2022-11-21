import HealthySocialWebApi from "../HealthySocialWebApi";

// Public resource api

const GetPublishedPostsByUser = (userId, page) => {
  return HealthySocialWebApi().get(
    `/users/${userId}/published-posts?page=${page}`
  );
};

const GetRelatedPostsByCategory = (categoryId) => {
  return HealthySocialWebApi().get(`/related-posts/${categoryId}`);
};

const GetDetailPost = (postId) => {
  return HealthySocialWebApi().get(`/posts/${postId}`);
};
/**
 * Get tags by post
 */
const GetTagsByPost = (postId) => {
  return HealthySocialWebApi().get(`/posts/${postId}/tags`);
};
const GetTotalLikeOfPost = (postId) => {
  return HealthySocialWebApi().get(`/posts/${postId}/total-likes`);
};
const GetCommentsByPost = (payload) => {
  return HealthySocialWebApi().get(
    `posts/${payload.postId}/comments?page=${payload.page}`
  );
};

const GetPostByCategory = (page, categoryId) => {
  return HealthySocialWebApi().get(
    `/posts?filter[category_id]=${categoryId}&page=${page}`
  );
};

const GetPostsByTag = (page, tagId) => {
  return HealthySocialWebApi().get(`/posts?filter[tag_id]=${tagId}&page=${page}`);
};

const GetCategories = () => {
  return HealthySocialWebApi().get("/categories");
};

/**
 * Get user profile
 */
const GetUserProfile = (userId) => {
  return HealthySocialWebApi().get(`/users/${userId}/profiles`);
};

const GetUserWithRoles = (userId) => {
  return HealthySocialWebApi().get(`/users/${userId}/roles`);
};

const SearchPosts = (title, page) => {
  return HealthySocialWebApi().get(`/search?title=${title}&page=${page}`);
};

const GetCites = () => {
  return HealthySocialWebApi().get("/public/cities");
};

const GetDistricts = (cityID) => {
  return HealthySocialWebApi().get(`/public/cities/${cityID}/districts`);
};

const GetWards = (districtID) => {
  return HealthySocialWebApi().get(`/public/districts/${districtID}/wards`);
};

const GetTags = () => {
  return HealthySocialWebApi().get("/tags");
};

const FilterPosts = (categoryId, tagId, page) => {
  if (categoryId && tagId) {
    return HealthySocialWebApi().get(
      `/posts?filter[category_id]=${categoryId}&filter[tag_id]=${tagId}&page=${page}`
    );
  }

  if (categoryId) {
    return HealthySocialWebApi().get(
      `/posts?filter[category_id]=${categoryId}&page=${page}`
    );
  } else if (tagId) {
    return HealthySocialWebApi().get(
      `/posts?filter[tag_id]=${tagId}&page=${page}`
    );
  } else {
    return HealthySocialWebApi().get(`/posts?page=${page}`);
  }
};

const SearchUsers = (query, page) => {
  return HealthySocialWebApi().get(`/search/users?query=${query}&page=${page}`);
};

export {
  GetUserProfile,
  GetUserWithRoles,
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
  SearchUsers,
};
