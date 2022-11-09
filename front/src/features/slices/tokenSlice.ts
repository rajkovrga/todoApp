import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StateTokenModel {
    token: string | null,
    permissions: string[] | null,
    data: any | null
}

let initialState: StateTokenModel = {
    token: '',
    permissions: [],
    data: {}
}

const tokenData = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') ?? '') : null

if(tokenData)
{
    const data = JSON.parse(tokenData);

    initialState = {
        token: data.token,
        permissions: data.permissions,
        data: data.data
    }
}

const tokenSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        set: (state, action: PayloadAction<StateTokenModel>) => {
            localStorage.setItem('token', JSON.stringify({
                token: action.payload.token,
                permissions: action.payload.permissions,
                data: action.payload.data
            }))
                const {token, permissions, data} = action.payload;
                state.token = token;
                state.permissions = permissions;
                state.data = data;
        },
        remove: (state) => {
            localStorage.removeItem('token');
            state = initialState;
        }
    }
});

export default tokenSlice.reducer;
export const {set, remove} = tokenSlice.actions;