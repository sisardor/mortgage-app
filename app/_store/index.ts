// /store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import applicationReducer from "./applicationSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    application: applicationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;