import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { updateFilter } = uiSlice.actions;

export const selectFilter = (state) => state.ui.filter;

export default uiSlice.reducer;
