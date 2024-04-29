import { configureStore } from "@reduxjs/toolkit";
import authReducer from './feactures/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
      },
})