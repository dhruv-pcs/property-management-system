import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: [],
};

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
      setCustomer: (state, action) => {
        state.customer = action.payload;
      },
    },
});

export const { setCustomer } = customerSlice.actions;

export default customerSlice.reducer