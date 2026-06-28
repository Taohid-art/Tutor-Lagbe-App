import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppNotification } from "@/lib/types"
import { mockNotifications } from "@/lib/mock-data"

interface NotificationsState {
  items: AppNotification[]
}

const initialState: NotificationsState = {
  items: mockNotifications,
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const n = state.items.find((item) => item.id === action.payload)
      if (n) n.read = true
    },
    markAllAsRead: (state) => {
      state.items.forEach((n) => {
        n.read = true
      })
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((n) => n.id !== action.payload)
    },
  },
})

export const { markAsRead, markAllAsRead, removeNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
