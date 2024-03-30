import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface userType {
    user: null | User,
    token: string,
}

const initialState: userType = {
    user: null,
    token: "",
}

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<userType>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        profileUpdate: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = "";
        },
        saveAddress: (state, action) => {

        }
    },
})

export const { loginUser, logoutUser, profileUpdate } = UserSlice.actions

export default UserSlice.reducer