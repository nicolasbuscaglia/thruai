import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./features/uiSlice";
import { casesApi } from "./services/casesApi";
import { engageApi } from "./services/engageApi";
import { processingApi } from "./services/processingApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    [casesApi.reducerPath]: casesApi.reducer,
    [engageApi.reducerPath]: engageApi.reducer,
    [processingApi.reducerPath]: processingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      casesApi.middleware,
      engageApi.middleware,
      processingApi.middleware,
    ]),
});

setupListeners(store.dispatch);
