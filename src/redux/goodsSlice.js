import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../const';

const initialState = {
  name: '',
  items: [],
  status: "idle",
  error: null,
  content: null,
};

export const fetchGoods = createAsyncThunk("goods/fetchGoods", async (params) => {
  const queryString = new URLSearchParams(params).toString();
  
  const response = await fetch(
    `${API_URL}/api/products${queryString ? `?${queryString}` : ""}`,);

    if (!response.ok) {
      throw new Error('Не удалось получить данные');
    }

  return await response.json();
});



const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.content = state.status;
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.content = action.error.message;
      });
  }
});

export default goodsSlice.reducer;