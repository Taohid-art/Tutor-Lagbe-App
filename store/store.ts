import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import postsReducer from "./slices/postsSlice"
import profileReducer from "./slices/profileSlice"
import jobsReducer from "./slices/jobsSlice"
import messagesReducer from "./slices/messagesSlice"
import notificationsReducer from "./slices/notificationsSlice"
import connectionsReducer from "./slices/connectionsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    profile: profileReducer,
    jobs: jobsReducer,
    messages: messagesReducer,
    notifications: notificationsReducer,
    connections: connectionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
