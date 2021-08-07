import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      let index = state.items.findIndex((item) => item.id === action.payload.id);
      if(index !== -1) {
        state.items[index].qty += 1;
      }else {
        state.items.push(action.payload);
      };
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQty: (state, action) => {
      let index = state.items.findIndex((item) => item.id === action.payload);
      if(index !== -1) state.items[index].qty += 1;
    },
    decreaseQty: (state, action) => {
      let index = state.items.findIndex((item) => item.id === action.payload);
      if(index !== -1) {
        state.items[index].qty -= 1;
        if(state.items[index].qty < 1) {
          state.items.splice(index, 1);
        };
      };
    },
  },
});

export const { addToBasket, removeFromBasket, increaseQty, decreaseQty } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;

export default basketSlice.reducer;
