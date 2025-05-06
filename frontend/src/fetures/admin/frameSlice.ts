"use client";

import { IFrame } from "@/Interfaces/IFrame";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    frames: IFrame[];
}

const initialState: IInitialState = {
    frames: [],
};

const frameSlice = createSlice({
    name: "frame",
    initialState,
    reducers: {
        setProductFrame: (state, action) => {
            state.frames = action.payload;
        },
        addProductFrame: (state, action) => {
            state.frames.unshift(action.payload);
        },
        updateProductFrame: (state, action) => {
            const index = state.frames.findIndex((frame) => frame._id === action.payload._id);
            if (index !== -1) {
                state.frames[index] = action.payload;
            }
        },
        deleteProductFrame: (state, action) => {
            state.frames = state.frames.filter((cat) => cat._id !== action.payload);
        },
    },
});

export const { setProductFrame, addProductFrame, deleteProductFrame, updateProductFrame } = frameSlice.actions;
export default frameSlice.reducer;
