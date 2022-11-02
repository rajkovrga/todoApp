import { LOGIN_ROUTE, REGISTRATION_USER_ROUTE, RESEND_VERIFY_ROUTE, USER_VERIFY_ROUTE } from "../api/routes";
import axios from "../api/axios";
import { LoginModel, RegistrationModel } from "../models";


export const getToken = async (data: LoginModel)  => {
    return await axios.post(LOGIN_ROUTE, data);
}

export const registerUser = async (data: RegistrationModel) => {
    return await axios.post(REGISTRATION_USER_ROUTE, data);
}

export const resendVerification = async (data: string) => {
    return await axios.post(RESEND_VERIFY_ROUTE, data, { headers: { 'Content-Type': 'text/plain' } });
}

export const verifyUser = async (data: string) => {
    return await axios.put(USER_VERIFY_ROUTE, data, { headers: { 'Content-Type': 'text/plain' } });
}