import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/products-slice";
import shoppingProductSlice from "./shop/products-slice";
import shoppingCartSlice from "./shop/cart-slice";
import addressSlice from "./shop/address-slice";




const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProduct: adminProductSlice,
        shoppingProduct: shoppingProductSlice,
        shoppingCart:shoppingCartSlice,
        shoppingAddress:addressSlice,
    }
})


export default store;