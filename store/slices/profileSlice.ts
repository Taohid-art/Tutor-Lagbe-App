import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Profile } from "@/lib/types"
import { mockProfile } from "@/lib/mock-data"

const initialState: Profile = mockProfile

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateAbout: (state, action: PayloadAction<string>) => {
      state.about = action.payload
    },
    updateHeadline: (state, action: PayloadAction<string>) => {
      state.headline = action.payload
    },
    addSkill: (state, action: PayloadAction<string>) => {
      if (!state.skills.includes(action.payload)) {
        state.skills.push(action.payload)
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((s) => s !== action.payload)
    },
  },
})

export const { updateAbout, updateHeadline, addSkill, removeSkill } = profileSlice.actions
export default profileSlice.reducer
