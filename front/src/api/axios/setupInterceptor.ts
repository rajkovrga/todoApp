import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import moment from "moment";
import { redirect } from "react-router-dom";
import { removeTokenData, setTokenData, StateTokenModel } from "../../features/slices/tokenSlice";
import { TokenModel } from "../../models";
import { refreshToken } from "../../services/auth.service";
import jwtDecode from "jwt-decode";
import { AxiosError, AxiosInstance } from "axios";

const setupInterceptor = (store: ToolkitStore, axios: AxiosInstance) => {
    axios.interceptors.request.use(request => {
        const state: StateTokenModel = store.getState().token;
        if (state.token) {
            request.headers = { Authorization: `Bearer ${state.token}` };
    
            const data: any = jwtDecode(state.token!);
            const isExp = moment.unix(data.exp).diff(moment()) < 1;
    
            if (isExp && state.refreshToken) {
                const tokenModel: TokenModel = {
                    token: state.token,
                    refreshToken: state.refreshToken
                };
                try {
                    const callRefreshToken = async (tokenModel: TokenModel) => {
                        const response = await refreshToken(tokenModel);
                        const data: StateTokenModel = {
                            ...state,
                            token: response.data.token,
                            refreshToken: response.data.refreshToken
                        };
    
                        store.dispatch(setTokenData(data));
                    }
                    callRefreshToken(tokenModel);
                }
                catch (err) {
                    console.log(err);
                    store.dispatch(removeTokenData());
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