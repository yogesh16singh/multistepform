import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    email: string;
    password: string;
    isEmailValid: boolean;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    email: '',
    password: '',
    isEmailValid: true,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setIsEmailValid: (state, action: PayloadAction<boolean>) => {
            state.isEmailValid = action.payload;
        },
        setLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        resetAuth: () => initialState,
    },
});

export const {
    setEmail,
    setPassword,
    setIsEmailValid,
    setLoggedIn,
    resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
