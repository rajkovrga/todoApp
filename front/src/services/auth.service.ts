import { LOGIN_ROUTE, REGISTRATION_USER_ROUTE, RESEND_VERIFY_ROUTE, USER_VERIFY_ROUTE } from "../api/routes";
import { LoginModel, RegistrationModel } from "../models";
import axiosInstance from "../api/axiosInstance";

export const loginUser = async (data: LoginModel)  => {
    return await axiosInstance.post(LOGIN_ROUTE, data);
}

export const registerUser = async (data: RegistrationModel) => {
    return await axiosInstance.post(REGISTRATION_USER_ROUTE, data);
}

export const resendVerification = async (data: string) => {
    return await axiosInstance.post(RESEND_VERIFY_ROUTE, data, { headers: { 'Content-Type': 'text/plain' } });
}

export const verifyUser = async (data: string) => {
    return await axiosInstance.put(USER_VERIFY_ROUTE, data, { headers: { 'Content-Type': 'text/plain' } });
}