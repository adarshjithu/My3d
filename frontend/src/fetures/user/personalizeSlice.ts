
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    product:any;
    variant:{},
     orientation:boolean,
    orientationType:string,
    total:0
}
const initialState:IInitialState = {
    product: {},
    variant:{},
    orientation:false,
    orientationType:'standing',
    total:0
};
const personalizeSlice = createSlice({
    name: "personalize",
    initialState,
    reducers: {
        addPersonalize: (state, action) => {
            state.product = action.payload
        },
        setVariant:(state,action)=>{
            state.variant = action.payload;
        },
        setOrientation:(state,action)=>{
            state.orientation = action.payload;
        },
        setOrientationType:(state,action)=>{
            state.orientationType = action.payload;
        },
        setTotal:(state,action)=>{
            state.total = action.payload
        },
        addTotal:(state,action)=>{
            state.total += action.payload
        },
        deductTotal:(state,action)=>{
            state.total-=action.payload
        }
    },
    
});

export const { addPersonalize ,setVariant,setOrientationType,setOrientation,setTotal,addTotal,deductTotal} = personalizeSlice.actions;
export default personalizeSlice.reducer;
