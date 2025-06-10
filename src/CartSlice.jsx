import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.name === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.name === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    }
  }
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity
} = CartSlice.actions;

export default CartSlice.reducer;
