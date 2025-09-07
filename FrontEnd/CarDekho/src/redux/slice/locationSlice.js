import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name :"location",
    initialState: {
        states: [],
        districts: [],
        cities: [],
    },
    reducers:{
        addStates :(state,action)=>{
            state.states = action.payload;
        },
        addDistricts :(state,action)=>{
            state.districts = action.payload;
        },
        addCities :(state,action)=>{
            state.cities = action.payload;
        },
        removeStates :(state)=>{
            state.states = [];
        },
        removeDistricts :(state)=>{
            state.districts = [];
        },
        removeCities :(state)=>{
            state.cities = [];
        }
    
    }
})
export const {addStates,addDistricts,addCities,removeStates,removeDistricts,removeCities} = locationSlice.actions;
export default locationSlice.reducer;