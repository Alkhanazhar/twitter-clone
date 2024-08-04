import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        otherUsers: null,
        profile: null
    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
        },
        getOtherUser: (state, action) => {
            state.otherUsers = action.payload
        },
        getProfileAction: (state, action) => {
            state.profile = action.payload
        },
    }
})
export const { getUser, getOtherUser,getProfileAction } = userSlice.actions
export default userSlice.reducer