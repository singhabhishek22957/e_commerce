import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/products-slice";
import shoppingProductSlice from "./shop/products-slice";






const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProduct: adminProductSlice,
        shoppingProduct: shoppingProductSlice
    }
})


export default store;