import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  owners: [],
  isLoading: true
}

export const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    setOwners: (state, action) => {
      state.owners = action.payload
      state.isLoading = false
    }


    
  }
})
