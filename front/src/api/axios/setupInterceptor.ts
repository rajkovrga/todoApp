import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import moment from "moment";
import { redirect } from "react-router-dom";
import { setTokenData, StateTokenModel } from "../../features/slices/tokenSlice";
import { TokenModel } from "../../models";
import { refreshToken } from "../../services/auth.service";
import jwtDecode from "jwt-decode";
import { AxiosError, AxiosInstance } from "axios";

const setupInterceptor = (store: ToolkitStore, axios: AxiosInstance) => {
    axios.interceptors.request.use(request => {
        const selector = store.getState();
        const dispatch = store.dispatch;
        if (selector.token.accessToken) {
            request.headers = { Authorization: `Bearer ${selector.token}` };
    
            const data: any = jwtDecode(selector.token!);
            const isExp = moment.unix(data.exp).diff(moment()) < 1;
    
            if (isExp && selector.refreshToken) {
                const tokenModel: TokenModel = {
                    accessToken: selector.token,
                    refreshToken: selector.refreshToken
                };
                try {
                    const callRefreshToken = async (tokenModel: TokenModel) => {
                        const response = await refreshToken(tokenModel);
                        const data: StateTokenModel = {
                            ...selector,
                            accessToken: response.data.accessToken,
                            refreshToken: response.data.refreshToken
                        };
    
                        dispatch(setTokenData(data));
                    }
                    callRefreshToken(tokenModel);
                }
                catch (err) {
                    console.log(err);
                }
    
            }
        }
    
        return request;
    });
    
    axios.interceptors.response.use(response => {
        if (response.status === 401) {
            redirect('/login');
        }
        return response;
    }, err => {
        throw new AxiosError(err);
    });
}

export default setupInterceptor;