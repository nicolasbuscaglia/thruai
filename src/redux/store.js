import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features/uiSlice";
import { casesApi } from "./services/casesApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    [casesApi.reducerPath]: casesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([casesApi.middleware]),
});

setupListeners(store.dispatch);
