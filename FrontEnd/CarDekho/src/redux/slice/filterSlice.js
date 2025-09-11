import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filterData",
    initialState:{
        filterData : []
    },
    reducers:{
        addFilter : (state,action)=>{
            state.filterData = action.payload;
        },
        removeFilter : (state)=>{
            state.filterData = [];
        }
    }

})
export const {addFilter,removeFilter} = filterSlice.actions;
export default filterSlice.reducer;