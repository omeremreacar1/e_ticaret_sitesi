import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
