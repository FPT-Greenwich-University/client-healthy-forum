import axios from "axios";

const BaseApi = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_API_URL,
});

BaseApi.defaults.headers.post["Content-Type"] = "application/json";
BaseApi.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const Api = () => {
    const token = localStorage.getItem("token");
    console.log('url', process.env.VUE_APP_BACKEND_API_URL)
    if (token) {
        BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return BaseApi;
};

export default Api;