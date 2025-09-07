import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/products-slice";
import shoppingProductSlice from "./shop/products-slice";
import shoppingCartSlice from "./shop/cart-slice";
import addressSlice from "./shop/address-slice";
import orderSlice from "./shop/order-slice";
import adminOrderSlice from "./admin/order-slice/index.js";
import searchSlice from "./shop/search-slice/index.js";
import reviewSlice from "./shop/review-slice/index.js";
import featureSlice from "./common/feature-slice/index.js";



const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProduct: adminProductSlice,
        adminOrder:adminOrderSlice,


        shoppingProduct: shoppingProductSlice,
        shoppingCart:shoppingCartSlice,
        shoppingAddress:addressSlice,
        shoppingOrder:orderSlice,
        shoppingSearch:searchSlice,
        shoppingReview:reviewSlice,

        commonFeature:featureSlice,

    }
})


export default store;