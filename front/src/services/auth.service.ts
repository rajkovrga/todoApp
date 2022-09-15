import { BASE_URL } from "api";
import axios from "axios";
import { LoginModel, RegistrationModel} from "models";

export default class AuthService {

    getToken(data: LoginModel)
    {
        console.log(BASE_URL)

        return axios.post(BASE_URL + '/User/CreateToken', data);
    }

    registerUser(data: RegistrationModel)
    {
        return axios.post(BASE_URL + '/User/Register', JSON.stringify(data));
    }
    
}