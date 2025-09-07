import { createSlice } from "@reduxjs/toolkit";

const candleSlice = createSlice({
    name : "candle",
    initialState: {
        isOn : false
    },
    reducers :{
        toggleCandleCursor : (state)=>{
            state.isOn = ! state.isOn
        }
    }
})
export const {toggleCandleCursor} = candleSlice.actions;
export default candleSlice.reducer;