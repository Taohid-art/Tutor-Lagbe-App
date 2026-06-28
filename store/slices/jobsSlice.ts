import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Job } from "@/lib/types"
import { mockJobs } from "@/lib/mock-data"

interface JobsState {
  items: Job[]
}

const initialState: JobsState = {
  items: mockJobs,
}

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    toggleSave: (state, action: PayloadAction<string>) => {
      const job = state.items.find((j) => j.id === action.payload)
      if (job) job.saved = !job.saved
    },
    applyToJob: (state, action: PayloadAction<string>) => {
      const job = state.items.find((j) => j.id === action.payload)
      if (job) {
        job.applied = true
        job.applicants += 1
      }
    },
  },
})

export const { toggleSave, applyToJob } = jobsSlice.actions
export default jobsSlice.reducer
