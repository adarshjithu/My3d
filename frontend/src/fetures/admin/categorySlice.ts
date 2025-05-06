"use client";
import { ICategory } from "@/Interfaces/ICategory";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    categories: ICategory[];
}

const initialState:IInitialState = {
    categories: [],
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload; 
        },
        addCategory: (state, action) => {
            state.categories.unshift(action.payload); 
        },
        updateCategory: (state, action) => {
            const index = state.categories.findIndex(cat => cat._id === action.payload._id);
            if (index !== -1) {
                state.categories[index] = action.payload; 
            }
        },
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter(cat => cat._id !== action.payload);
        }
    },
});

export const { setCategories, addCategory,updateCategory,deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
