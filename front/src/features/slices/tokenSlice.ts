import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StateTokenModel {
    token: string,
    refreshToken: string
    permissions: string[],
    data: any
}

let initialState: StateTokenModel = {
    token: '',
    refreshToken: '',
    permissions: [],
    data: {}
}

const tokenData = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') ?? '') : null

if(tokenData)
{
    initialState = {
        token: tokenData.token,
        refreshToken: tokenData.refreshToken,
        permissions: tokenData.permissions,
        data: tokenData.data
    }
}

export const tokenSlice = createSlice({
    name: 'token',
    initialState: initialState,
    reducers: {
        setTokenData: (state, action: PayloadAction<StateTokenModel>) => {
            localStorage.setItem('token', JSON.stringify({
                accessToken: action.payload.token,
                permissions: action.payload.permissions,
                data: action.payload.data,
                refreshToken: action.payload.refreshToken
            }))
                const {token, refreshToken, permissions, data} = action.payload;
                state.token = token;
                state.refreshToken = refreshToken;
                state.permissions = permissions;
                state.data = data;
        },
        removeTokenData: (state) => {
            localStorage.removeItem('token');
            state = {
                token: '',
                refreshToken: '',
                permissions: [],
                data: {}
            };
            return state;
        },
        getTokenData: (state) => state
    }
});

export const {setTokenData, removeTokenData, getTokenData} = tokenSlice.actions;