import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: []
}

export const adminSlice = createSlice({
  name: 'Admin',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload
    }
  }
})

export const { setAdmin } = adminSlice.actions

export default adminSlice.reducer
