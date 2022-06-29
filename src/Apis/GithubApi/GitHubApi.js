import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_GITHUB_API_URL,
});

const GithubApi = () => {
  return instance;
};

export default GithubApi;
