import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import ownerReducer from './features/ownerSlice'
import customerReducer from './features/customerSlice'
import permissionReducer from './features/permissionSlice'
import propertyReducer from './features/propertySlice'
import adminReducer from './features/admin-slice'
import roleReducer from './features/roleSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    role: roleReducer,
    owner: ownerReducer,
    customer: customerReducer,
    permission: permissionReducer,
    property: propertyReducer
  }
})
