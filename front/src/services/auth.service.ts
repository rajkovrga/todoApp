import { BASE_URL } from "api";
import axios from "axios";
import { LoginModel, RegistrationModel, RegistrationReturnModel, TokenModel } from "models";

export default class AuthService {

    getToken(data: LoginModel)
    {
        return axios.post(BASE_URL + '/User/CreateAToken', data);
    }

    registerUser(data: RegistrationModel)
    {
        return axios.post(BASE_URL + '/User/Register', data);
    }
    
}