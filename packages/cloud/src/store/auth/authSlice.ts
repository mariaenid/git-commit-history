import { createSlice } from "@reduxjs/toolkit";

export enum AuthStatus {
    Authenticated = 'authenticated',
    NotAuthenticated = 'no-authenticated',
    Loading = 'loading'
}
interface IUserStore {
    id: string;
    name: string;
    lastName: string;
    email: string;
}
interface IAuthStore {
    name: 'auth';
    user: IUserStore;
    errorMessage: any;
}
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: AuthStatus.NotAuthenticated,
        user: {},
        errorMessage: undefined
    },
    reducers: {
        onCheck: (state) => {
            state.status = AuthStatus.Loading;
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = AuthStatus.Authenticated;
            state.user = payload
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = AuthStatus.NotAuthenticated;
            state.user = {}
            state.errorMessage = payload;
        },
        onRegister: (state, { payload }) => {
            state.status = AuthStatus.NotAuthenticated;
            state.user = {}
            state.errorMessage = payload;
        },
        cleanErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
    }
});

export const { onCheck, onLogin, onLogout, onRegister, cleanErrorMessage } = authSlice.actions