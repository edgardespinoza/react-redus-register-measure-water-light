import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    showFilters: false,
  },
  reducers: {
    toggleFilters: (state) => {
      state.showFilters = !state.showFilters;
    },
  },
});

export const { toggleFilters } = filterSlice.actions;
export default filterSlice.reducer;
