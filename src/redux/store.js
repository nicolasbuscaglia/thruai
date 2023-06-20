import { configureStore } from "@reduxjs/toolkit";
import casesReducer from "./features/cases/caseSlice";
import chatsReducer from "./features/chats/chatsSlice";
import notesReducer from "./features/chats/notesSlice";
import filesReducer from "./features/cases/filesSlice";

export const store = configureStore({
  reducer: {
    cases: casesReducer,
    chats: chatsReducer,
    notes: notesReducer,
    files: filesReducer,
  },
});
