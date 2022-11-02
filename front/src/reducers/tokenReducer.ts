import {ActionTypes} from "../constants/ActionTypes";

export interface StateTokenModel {
    token: string,
    permissions: string[],
    data: any
}

let initialState: StateTokenModel = {
    token: '',
    permissions: [],
    data: {}
}

const user = JSON.parse(localStorage.getItem('token') ?? '');

if (!user) {
    initialState = {
        token: user.token,
        permissions: user.permissions,
        data: {
            email: user.data.email,
            fName: user.data.fName,
            lName: user.data.lName
        }
    }
}

type Action = { type: ActionTypes, payload: any };

const tokenReducer = (state: StateTokenModel = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.GET_TOKEN_DATA:
            break;
        case ActionTypes.ADD_TOKEN_DATA:
            state = {
                ...state,
                permissions: [...state.permissions, action.payload.permissions],
                token: action.payload.token,
                data: action.payload.data
            };
            localStorage.setItem('token', JSON.stringify(state));
            break;
        case ActionTypes.REMOVE_TOKEN_DATA:
            localStorage.removeItem('token');
            return initialState;
        default:
            return state;
    }
};

export default tokenReducer;