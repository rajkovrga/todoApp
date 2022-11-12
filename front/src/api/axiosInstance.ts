import axios from "axios";
import jwtDecode from "jwt-decode";
import moment from "moment";
import { useAppSelector } from "../app/hooks";

const BASE_URL = 'https://localhost:5001/api';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

axiosInstance.interceptors.request.use(async request => {
    const selector = useAppSelector((state) => state);

    if(selector)
    {
        request.headers = { Authorization: `Bearer ${selector.token}`};

        const data: any = jwtDecode(selector.token!);
        const isExp = moment.unix(data.exp).diff(moment()) < 1;

        if(isExp)
        {
            return request;
        }
    }
    console.log("intereceptor");

    return request;
})

export default axiosInstance; 

