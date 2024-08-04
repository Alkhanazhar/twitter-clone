import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlices"
import tweetReducer from "./slices/tweetSlices"

export const store = configureStore({
    reducer: {
        user: userReducer,
        tweet: tweetReducer
    }
})