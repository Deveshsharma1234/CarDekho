import { createSlice } from "@reduxjs/toolkit";

const listingFilterSlice = createSlice({
  name: "listingFilter",
  initialState: {
    listingFilter: {}, //  an object
  },
  reducers: {
    addListingFilter: (state, action) => {
      state.listingFilter = {
        ...state.listingFilter,
        ...action.payload,
      };
    },
     removeListingFilter: (state, action) => {
      if (action.payload) {
        const { [action.payload]: _, ...rest } = state.listingFilter;
        state.listingFilter = rest;
      } else {
        state.listingFilter = {};
      }
    },
  },
});

export const { addListingFilter, removeListingFilter } = listingFilterSlice.actions;
export default listingFilterSlice.reducer;
