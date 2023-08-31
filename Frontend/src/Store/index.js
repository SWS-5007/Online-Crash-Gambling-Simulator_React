import { configureStore } from "@reduxjs/toolkit";

import { userReducer, betReducer } from "./slices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    bet: betReducer,
  },
});

export * from "./slices";
