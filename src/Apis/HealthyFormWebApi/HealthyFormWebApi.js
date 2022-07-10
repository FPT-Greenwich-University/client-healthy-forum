import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API_URL,
});

axiosClient.defaults.headers.post["Content-Type"] = "application/json";

const HealthyFormWebApi = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return axiosClient;
};
export default HealthyFormWebApi;
