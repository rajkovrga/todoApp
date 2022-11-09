import axios from "axios";

const BASE_URL = 'https://localhost:5001/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

axiosInstance.interceptors.request.use( async request => {

    console.log("intereceptor");

    return request;
})

export default axiosInstance; 

