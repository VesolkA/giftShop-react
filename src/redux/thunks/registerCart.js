import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../const";

export const registerCart = createAsyncThunk('cart/registerCart',
  async () => {
    const responce = await fetch(`${API_URL}/api/cart/register`, {
      method: 'POST', 
      credentials: 'include',
    });
    if (!responce.ok)  {
      throw new Error('Регисрация не удалась');
    }
    return await responce.json();
  });