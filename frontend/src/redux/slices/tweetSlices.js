import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name: "tweet",
    initialState: {
        allTweets: null,
        refresh: false

    },
    reducers: {
        getTweets: (state, action) => {
            state.allTweets = action.payload.tweets
        },
        getRefresh: (state) => {
            state.refresh = !state.refresh
        }
    }
})
export const { getTweets,getRefresh } = tweetSlice.actions
export default tweetSlice.reducer
