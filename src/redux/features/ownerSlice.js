import { createSlice} from '@reduxjs/toolkit';

const initialState = {
  ownerData: [],
};


const ownerSlice = createSlice({
  name: 'owner',
  initialState,
  reducers: {
    setOwner: (state, action) => {
      state.ownerData = action.payload;
    },
  },
  
});

export const { setOwner } = ownerSlice.actions;

export default ownerSlice.reducer;
