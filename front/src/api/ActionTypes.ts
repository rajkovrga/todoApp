export enum TokenActionTypes {
    ADD_TOKEN_DATA = 'ADD_TOKEN_DATA',
    REMOVE_TOKEN_DATA = 'REMOVE_TOKEN_DATA',
    GET_TOKEN_DATA = 'GET_TOKEN_DATA'
};

export type TokenActions = TokenActionTypes.ADD_TOKEN_DATA | TokenActionTypes.REMOVE_TOKEN_DATA;