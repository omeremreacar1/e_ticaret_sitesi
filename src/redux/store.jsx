import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import basketReducer from "./slices/basketSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    basket: basketReducer,
    search: searchReducer,
  },
});
