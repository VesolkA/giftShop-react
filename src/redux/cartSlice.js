import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../const';

const initialState = {
  isOpen: false,
  items: [],
  status: 'idle',
  accessKey: null,
  error: null,
  totalCartPrice: 0,
}; 

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

  export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState }) => {
        // const accessKey = getState().cart.accessKey;
    // console.log(accessKey);

    const responce = await fetch(`${API_URL}/api/cart`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!responce.ok)  {
      throw new Error('Не удалось получить данные корзины');
    }
    return await responce.json();
  });  

export const addItemToCart = createAsyncThunk('cart/addItemToCart', 

async ({ productId, quantity }) => {
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
      state.accessKey = ''; // null для отсутствующего ключа доступа
      state.error = action.error.message;
    })

     // Обработка состояния получения данных корзины
    .addCase(fetchCart.pending, (state) => {
      state.status = 'loading';
      state.error = null; // add from Alexey
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items =action.payload;
      state.totalCartPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0); // add from Alexey
    })
    .addCase(fetchCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })


    // Обработка состояний товаров в корзине
    .addCase(addItemToCart.pending, (state) => {
      state.status = 'loading';
      state.error = null; // add from Alexey
    })
    .addCase(addItemToCart.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items =action.payload;
      state.totalCartPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0); // add from Alexey
    })
    .addCase(addItemToCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const {toggleCart} = cartSlice.actions;

export default cartSlice.reducer; 
