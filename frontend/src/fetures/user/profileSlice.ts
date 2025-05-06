'use client'
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    profileData:null
};
const profileSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setUserProfile: (state, action) => {
          
            state.profileData = action.payload;
           
        },
      
    },
});

export const { setUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
