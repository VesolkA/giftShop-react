import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: "bouquets",
  minPrice: "",
  maxPrice: "",
  category: "",
};

const filtersSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    changeType(state, action) {
      state.type = action.payload;
      state.minPrice = "";
      state.maxPrice = "";
      state.category = "";
    },
    changePrice(state, action) {
      if  (!isNaN( //проверка ввода цены на числа
        parseInt(action.payload.value) && isFinite(action.payload.value), ) || action.payload.value === "") {
        state[action.payload.name] = action.payload.value;
      }
    },
  },
});

export const { changeType, changePrice } = filtersSlice.actions;

export default filtersSlice.reducer;