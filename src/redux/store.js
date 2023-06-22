import { configureStore } from "@reduxjs/toolkit";
import casesReducer from "./features/cases/caseSlice";
import chatsReducer from "./features/chats/chatsSlice";
import notesReducer from "./features/chats/notesSlice";
import filesReducer from "./features/cases/filesSlice";
import uiSlice from "./features/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    cases: casesReducer,
    chats: chatsReducer,
    notes: notesReducer,
    files: filesReducer,
  },
});
