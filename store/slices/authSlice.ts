import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { currentUser } from "@/lib/mock-data"

interface AuthState {
  isAuthenticated: boolean
  user: {
    id: string
    name: string
    email: string
    avatar: string
  } | null
}

const initialState: AuthState = {
  isAuthenticated: true,
  user: {
    id: currentUser.id,
    name: currentUser.name,
    email: "alex.morgan@example.com",
    avatar: currentUser.avatar,
  },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; name?: string }>) => {
      state.isAuthenticated = true
      state.user = {
        id: currentUser.id,
        name: action.payload.name ?? currentUser.name,
        email: action.payload.email,
        avatar: currentUser.avatar,
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
