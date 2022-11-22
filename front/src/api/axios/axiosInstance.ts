import axios from "axios";
import store from "../../store/store";
import setupInterceptor from "./setupInterceptor";
const BASE_URL = 'https://localhost:5001/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
});

setupInterceptor(store, axiosInstance);

export default axiosInstance;