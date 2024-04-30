import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  permission: []
}

export const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    setPermission: (state, action) => {
      state.permission = action.payload
    }
  }
})

export const { setPermission } = permissionSlice.actions

export default permissionSlice.reducer
