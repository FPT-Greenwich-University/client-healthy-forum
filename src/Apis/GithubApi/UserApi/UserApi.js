import GithubApi from "@/Apis/GithubApi/GitHubApi";

/**
 * Get author of this website
 * @param login Login name of user
 */
const GetAuthorInformation = (login) => {
  return GithubApi().get(`/users/${login}`);
};

export { GetAuthorInformation };
