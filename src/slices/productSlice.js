import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    searchProducts: []
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProductsSuccess: (state, action) => {
            state.products = action.payload;
            state.products.forEach((product) => product.qty = 1);
        },
        searchItem: (state, action) => {
            state.searchProducts = state.products.filter((product) => product.title.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1);
        },
    }
});

export const {searchItem, getProductsSuccess} = productSlice.actions;

export default productSlice.reducer;