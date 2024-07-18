import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../const";

export const fetchGoods = createAsyncThunk("goods/fetchGoods", async (params) => {

  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/api/products${queryString ? `?${queryString}` : ""}`,);

  // if (!response.ok) {
  //   throw new Error('Не удалось получить данные');
  // }

  return await response.json();
},
);