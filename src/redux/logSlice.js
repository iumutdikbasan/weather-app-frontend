import { createSlice } from "@reduxjs/toolkit";










const initialState = {
    isLoggedIn: false,
    username: null,
    displayName: null,
    password: null,
}



export const logSlice = createSlice({
    name: "log",
    initialState,
    reducers: {
        logout: (state, action) => {
            return initialState;
        },
        login: (state, action) => {
          
            state.isLoggedIn = true;
            state.username = action.payload.username;
           
            
        }

    }
});

export const { logout,login } = logSlice.actions;

export default logSlice.reducer;