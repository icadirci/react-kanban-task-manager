import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: !!localStorage.getItem("user"),
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("token");
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;