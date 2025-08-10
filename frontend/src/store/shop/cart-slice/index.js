import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";


const initialState = {
    cartItems :[],
    isLoading:false

}

export const addToCart = createAsyncThunk("cart/addToCart", async({userId,productId,quantity},{rejectWithValue})=>{
    try {

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/add`,{userId,productId,quantity});
        return response.data;
        
    } catch (error) {
        console.log("error", error);
        return rejectWithValue(error.response.data);
        
    }
})

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async({userId,productId,quantity},{rejectWithValue})=>{
    try {

        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/update-cart`,{userId,productId,quantity});
        return response.data;
        
    } catch (error) {
        console.log("error", error);
        return rejectWithValue(error.response.data);
        
    }
})

export const fetchCartItem = createAsyncThunk("cart/fetchCartItem", async({userId},{rejectWithValue})=>{
    try {

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/get/${userId}`);
        return response.data;
        
    } catch (error) {
        console.log("error", error);
        return rejectWithValue(error.response.data);
        
    }
})
export const deleteCartItem = createAsyncThunk("cart/deleteCartItem", async({userId,productId},{rejectWithValue})=>{
    try {

        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/delete/${userId}/${productId}`);
        return response.data;
        
    } catch (error) {
        console.log("error", error);
        return rejectWithValue(error.response.data);
        
    }
})


const shoppingCartSlice = createSlice({
    name:"shoppingCart",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(fetchCartItem.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(fetchCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(updateCartItem.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(updateCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(deleteCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        });

    }

})

export default shoppingCartSlice.reducer;