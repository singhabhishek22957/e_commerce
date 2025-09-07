import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading:false,
    approvalUrl:null,
    orderId:null,
    orderList:[],
    orderDetails:null,
}

export const createNewOrder = createAsyncThunk(
    "order/createNewOrder",
    async(orderData,{rejectWithValue})=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/shop/order/create-order`,orderData);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)

export const createNewOrderWithStripe = createAsyncThunk(
    "order/createNewOrderWithStripe",
    async(orderData,{rejectWithValue})=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/shop/order/create-stripe-order`,orderData);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)

export const getOrderById = createAsyncThunk("order/getOrderById", async(orderId,{rejectWithValue})=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shop/order/get-order-by-id/${orderId}`);
        return response.data;
    } catch (error) {
        console.log("error", error);
        return rejectWithValue(error.response.data);
    }
})

export const getOrderByUser = createAsyncThunk("order/getOrderByUser", async(userId,{rejectWithValue})=>{
    
    
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shop/order/get-order/${userId}`);
        return response.data;
    } catch (error) {
        console.log("error", error);
        return rejectWithValue(error.response.data);
    }
})


const orderSlice = createSlice(
    {
        name:"shoppingOrder",
        initialState,
        reducers:{
            resetOrderDetails:(state)=>{
                state.orderDetails = null;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(createNewOrder.pending, (state) => {
                state.isLoading = true;
            }).addCase(createNewOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalUrl = action.payload.paymentLink;
                state.orderId = action.payload.orderId;
            }).addCase(createNewOrder.rejected, (state) => {
                state.isLoading = false;
                state.approvalUrl = null;
                state.orderId = null;
            }).addCase(createNewOrderWithStripe.pending, (state) => {
                state.isLoading = true;
            }).addCase(createNewOrderWithStripe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalUrl = action.payload.url;
                state.orderId = action.payload.orderId;
            }).addCase(createNewOrderWithStripe.rejected, (state) => {
                state.isLoading = false;
                state.approvalUrl = null;
                state.orderId = null;
            }).addCase(getOrderByUser.pending, (state) => {
                state.isLoading = true;
            }).addCase(getOrderByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data;
            }).addCase(getOrderByUser.rejected, (state) => {
                state.isLoading = false;
                state.orderList = [];
            }).addCase(getOrderById.pending, (state) => {
                state.isLoading = true;
            }).addCase(getOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            }).addCase(getOrderById.rejected, (state) => {
                state.isLoading = false;
                state.orderDetails = null;
            })
                
        }
    }
)

export const {resetOrderDetails} = orderSlice.actions
export default orderSlice.reducer