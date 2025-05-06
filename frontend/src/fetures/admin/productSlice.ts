"use client";

import { IProduct } from "@/Interfaces/IProduct";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    products: IProduct[];
}

const initialState: IInitialState = {
    products: [],
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setAllProducts: (state, action) => {
            state.products = action.payload;
        },
        addNewProductData: (state, action) => {
            state.products.unshift(action.payload);
        },
        updateProductData: (state, action) => {
            const index = state.products.findIndex((product) => product._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProductData: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload);
        },
    },
});

export const { setAllProducts, addNewProductData, deleteProductData, updateProductData } = productSlice.actions;
export default productSlice.reducer;
