import { createSlice } from "@reduxjs/toolkit";

const carSlice = createSlice({
    name: "car",
    initialState:{
        brands: [],
        models: [],
    },
    reducers:{
        addBrands :(state,action)=>{
            state.brands = action.payload;
        },
        addModels :(state,action)=>{
            state.models = action.payload;
        },
        removeBrands :(state)=>{
            state.brands = [];
        },
        removeModels :(state)=>{
            state.models = [];
        }
    }
})
export const {addBrands,addModels,removeBrands,removeModels} = carSlice.actions;
export default carSlice.reducer;