import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Conversation } from "@/lib/types"
import { mockConversations } from "@/lib/mock-data"

interface MessagesState {
  conversations: Conversation[]
  activeId: string | null
}

const initialState: MessagesState = {
  conversations: mockConversations,
  activeId: mockConversations[0]?.id ?? null,
}

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<string>) => {
      state.activeId = action.payload
      const conv = state.conversations.find((c) => c.id === action.payload)
      if (conv) conv.unread = false
    },
    sendMessage: (state, action: PayloadAction<{ conversationId: string; content: string }>) => {
      const conv = state.conversations.find((c) => c.id === action.payload.conversationId)
      if (conv) {
        conv.messages.push({
          id: `m${Date.now()}`,
          fromMe: true,
          content: action.payload.content,
          timestamp: new Date().toISOString(),
        })
      }
    },
  },
})

export const { setActiveConversation, sendMessage } = messagesSlice.actions
export default messagesSlice.reducer
