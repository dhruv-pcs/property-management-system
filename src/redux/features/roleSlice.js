import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roles: [],
};

export const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        setRoles: (state, action) => {
            state.roles = action.payload;
        },
    },
})

export const { setRoles } = roleSlice.actions;

export default roleSlice.reducer;