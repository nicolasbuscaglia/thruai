import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
  isAuthenticated: false,
  isAuthSubmitting: false,
  authError: "",
  member: {},
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsAuthSubmitting: (state, action) => {
      state.isAuthSubmitting = action.payload;
    },
    setAuthError: (state, action) => {
      state.authError = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setMember: (state, action) => {
      state.member = action.payload;
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setIsAuthSubmitting,
  setAuthError,
  setIsAuthenticated,
  setMember,
  updateFilter,
} = uiSlice.actions;

export const selectAuthError = (state) => state.ui.authError;

export const selectIsAuthSubmitting = (state) => state.ui.isAuthSubmitting;

export const selectIsAuthenticated = (state) => state.ui.isAuthenticated;

export const selectMember = (state) => state.ui.member;

export const selectFilter = (state) => state.ui.filter;

export default uiSlice.reducer;
