'use client';  // Ensures the code is only executed in the client

import { createSlice } from "@reduxjs/toolkit";

// Conditionally set initialState based on client-side availability of localStorage
const initialState = {
  userData: typeof window !== 'undefined' && localStorage.getItem("my-3d-pic-userData")
    ? JSON.parse(localStorage.getItem("my-3d-pic-userData") || '')
    : null,
};

const authSlice = createSlice({
  name: "auth", // Update the name to match the feature (e.g., auth)
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      state.userData = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('my-3d-pic-userData', JSON.stringify(action.payload));
      }
    },
    logoutUser: (state) => {
      state.userData = null;
      if (typeof window !== 'undefined') {  
        localStorage.removeItem('my-3d-pic-userData');
      }
    },
  },
});

export const { setUserCredentials, logoutUser } = authSlice.actions;
export default authSlice.reducer;
