import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: "",
  newCase: {
    files: [],
  },
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
    manageUploadFiles: (state, action) => {
      state.newCase.files = action.payload.files;
    },
    removeFileById: (state, action) => {
      state.newCase.files = state.newCase.files.filter(
        (file) => file.id != action.payload.id
      );
    },
    setFileCleanCheck: (state, action) => {
      state.newCase.files = state.newCase.files.map((file) =>
        file.id === action.payload.id
          ? { ...file, clean: action.payload.clean }
          : file
      );
    },
  },
});

export const {
  setIsAuthSubmitting,
  setAuthError,
  setIsAuthenticated,
  setMember,
  updateFilter,
  manageUploadFiles,
  removeFileById,
  setFileCleanCheck,
} = uiSlice.actions;

export const selectAuthError = (state) => state.ui.authError;

export const selectIsAuthSubmitting = (state) => state.ui.isAuthSubmitting;

export const selectIsAuthenticated = (state) => state.ui.isAuthenticated;

export const selectMember = (state) => state.ui.member;

export const selectFilter = (state) => state.ui.filter;

export const selectNewFiles = (state) => state.ui.newCase.files;

export default uiSlice.reducer;
