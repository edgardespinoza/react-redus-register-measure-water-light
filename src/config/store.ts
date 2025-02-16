import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./state/cartSlice";
import filterReducer from "./state/filterSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
