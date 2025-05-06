"use client";


import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    banner: any[];
    allBannerData:{}
}

const initialState: IInitialState = {
    banner: [],
    allBannerData:{}
};

const bannerSlice = createSlice({
    name: "base",
    initialState,
    reducers: {
        setBannerData: (state, action) => {
            state.banner = action.payload;
        },
        setAllBannerData:(state,action)=>{
            state.allBannerData = action.payload
        }
       
    },
});

export const { setBannerData,setAllBannerData} = bannerSlice.actions;
export default bannerSlice.reducer;
