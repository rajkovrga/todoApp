import axios from "axios";
const BASE_URL = 'https://localhost:5001/api';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})