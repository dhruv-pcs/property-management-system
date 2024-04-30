import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  role: null,
  isLoggedIn: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
      state.isLoggedIn = true
    },
    setToken(state, action) {
      state.token = action.payload
    },
    setRole(state, action) {
      state.role = action.payload
    }
  }
})

export const { setUser, setToken, setRole, logout } = authSlice.actions

export default authSlice.reducer
