// Redux thunks - cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { registerCart } from '../thunks/registerCart';
import { fetchCart } from '../thunks/fetchCart';
import { addItemToCart } from '../thunks/addItemToCart';

const initialState = {
  isOpen: false,
  items: [],
  accessKey: null,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCart.fulfilled, (state, action) => {
        state.accessKey = action.payload.accessKey;
      })
      .addCase(registerCart.rejected, (state, action) => {
        state.accessKey = "";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { toggleCart } = cartSlice.actions;

export default cartSlice.reducer;
