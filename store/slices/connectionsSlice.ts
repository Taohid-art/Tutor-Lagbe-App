import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ConnectionSuggestion } from "@/lib/types"
import { mockSuggestions } from "@/lib/mock-data"

interface ConnectionsState {
  suggestions: ConnectionSuggestion[]
}

const initialState: ConnectionsState = {
  suggestions: mockSuggestions,
}

const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    toggleInvite: (state, action: PayloadAction<string>) => {
      const s = state.suggestions.find((item) => item.id === action.payload)
      if (s) s.invited = !s.invited
    },
  },
})

export const { toggleInvite } = connectionsSlice.actions
export default connectionsSlice.reducer
