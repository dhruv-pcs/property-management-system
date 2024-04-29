import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  properties: []
}

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload
    }
  }
})

export const { setProperties } = propertySlice.actions

export default propertySlice.reducer
