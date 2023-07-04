import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
  newCase: {
    files: [],
  },
  isAuthenticated: false,
  isAuthSubmitting: false,
  authError: "",
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
    updateIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
    manageUploadFiles: (state, action) => {
      state.newCase.files = action.payload.files;
    },
    removeFileById: (state, action) => {
      state.newCase.files = state.newCase.files.filter(
        (file) => file.id != action.payload.fileId
      );
    },
    setFileCleanCheck: (state, action) => {
      state.newCase.files = state.newCase.files.map((file) =>
        file.id === action.payload.fileId
          ? { ...file, clean: action.payload.clean }
          : file
      );
    },
  },
});

export const {
  setIsAuthSubmitting,
  setAuthError,
  updateIsAuthenticated,
  updateFilter,
  manageUploadFiles,
  removeFileById,
  setFileCleanCheck,
} = uiSlice.actions;

export const selectAuthError = (state) => state.ui.authError;

export const selectIsAuthSubmitting = (state) => state.ui.isAuthSubmitting;

export const selectIsAuthenticated = (state) => state.ui.isAuthenticated;

export const selectFilter = (state) => state.ui.filter;

export const selectNewFiles = (state) => state.ui.newCase.files;

export default uiSlice.reducer;
