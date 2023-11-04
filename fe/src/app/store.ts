import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/user/userSlice";
import themeReducer from "../slice/theme/themeSlice";
import productReducer from "../slice/product/productSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    theme: themeReducer,
    products: productReducer,
  },
});
