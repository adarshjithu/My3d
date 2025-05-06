"use client";
import { ICategory } from "@/Interfaces/ICategory";
import { ISize } from "@/Interfaces/ISize";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    sizes: ISize[];
}

const initialState: IInitialState = {
    sizes: [],
};

const sizeSlice = createSlice({
    name: "size",
    initialState,
    reducers: {
        setSizes: (state, action) => {
            state.sizes = action.payload;
        },
        pushSize: (state, action) => {
            state.sizes.unshift(action.payload);
        },
        updateSize: (state, action) => {
            const index = state.sizes.findIndex((size) => size._id === action.payload._id);
            if (index !== -1) {
                state.sizes[index] = action.payload;
            }
        },
        deleteSize: (state, action) => {
            state.sizes = state.sizes.filter((cat) => cat._id !== action.payload);
        },
    },
});

export const { setSizes, pushSize, updateSize, deleteSize } = sizeSlice.actions;
export default sizeSlice.reducer;
