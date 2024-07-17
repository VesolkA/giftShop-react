import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../const';

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

// функция получения данных с корзины
  export const fetchCart = createAsyncThunk('cart/fetchCart', async () => { 
    const responce = await fetch(`${API_URL}/api/cart`, {
      credentials: 'include',
    });

    if (!responce.ok)  {
      throw new Error('Не удалось получить данные корзины');
    }
    return await responce.json();
  });  

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ productId, quantity }) => {
  const responce = await fetch(`${API_URL}/api/cart/items`, {
    method: 'POST', 
    credentials: 'include',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify({ productId, quantity })
  });
  if (!responce.ok)  {
    throw new Error('Не удалось добавить товар в корзину');
  }
  return await responce.json();
},
);

const initialState = {
  isOpen: false,
  items: [],
  status: 'idle',
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
    // Обработка состояния регистрации корзины
    .addCase(registerCart.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(registerCart.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.accessKey = action.payload.accessKey;
    })
    .addCase(registerCart.rejected, (state, action) => {
      state.status = 'failed';
      state.accessKey = null; // null для отсутствующего ключа доступа
      state.error = action.error.message;
    })
     // Обработка состояния получения данных корзины
    .addCase(fetchCart.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items =action.payload;
    })
    .addCase(fetchCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    // Обработка состояний товаров в корзине
    .addCase(addItemToCart.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(addItemToCart.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items =action.payload;
    })
    .addCase(addItemToCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const {toggleCart} = cartSlice.actions;

// Селектор для вычисления общей суммы
export const selectTotalPrice = (state) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer; 
