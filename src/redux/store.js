import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import ownerReducer from './features/owner-slice'
import customerReducer from './features/customer-slice'
import permissionReducer from './features/permission-slice'
import propertyReducer from './features/property-slice'
import adminReducer from './features/admin-slice'
import roleReducer from './features/role-slice'

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
