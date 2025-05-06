"use client";

import { ISize } from "@/Interfaces/ISize";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    bases: ISize[];
}

const initialState: IInitialState = {
    bases: [],
};

const baseSlice = createSlice({
    name: "base",
    initialState,
    reducers: {
        setBases: (state, action) => {
            state.bases = action.payload;
        },
        pushBase: (state, action) => {
            state.bases.unshift(action.payload);
        },
        updateBaseData: (state, action) => {
            const index = state.bases.findIndex((base) => base._id === action.payload._id);
            if (index !== -1) {
                state.bases[index] = action.payload;
            }
        },
        deleteBaseData: (state, action) => {
            state.bases = state.bases.filter((cat) => cat._id !== action.payload);
        },
    },
});

export const { setBases, pushBase, updateBaseData, deleteBaseData } = baseSlice.actions;
export default baseSlice.reducer;
