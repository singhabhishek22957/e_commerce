import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading:false,
    productsList:[],
    productDetails:null,
}


export const fetchedFilteredProducts = createAsyncThunk(
    "products/fetchFilteredProducts",
    async({filtersParams,sortParams},{rejectWithValue})=>{
        try {
            const  query = new URLSearchParams({
                ...filtersParams,
                sortBy:sortParams
            })
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shop/product/get-filtered-products?${query}`);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)
export const fetchedProductDetails = createAsyncThunk(
    "products/fetchProductDetails",
    async(id,{rejectWithValue})=>{
        try {
           
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shop/product/get-product/${id}`);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)



const shoppingProductSlice  = createSlice({
    name:"shoppingProduct",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchedFilteredProducts.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchedFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productsList = action.payload.data;
        })
        .addCase(fetchedFilteredProducts.rejected, (state) => {
            state.isLoading = false;
            state.productsList = [];
        })
        .addCase(fetchedProductDetails.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchedProductDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetails = action.payload.data;
            console.log("state.productsDetails", state.productsDetails);
            
        })
        .addCase(fetchedProductDetails.rejected, (state) => {
            state.isLoading = false;
            state.productsDetails = null;
        })
        
    }
})

export default shoppingProductSlice.reducer
