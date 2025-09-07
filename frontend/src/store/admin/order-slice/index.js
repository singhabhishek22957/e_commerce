import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState={
    isLoading:false,
    orderList :[],
    orderDetails:{},
}

export const getAllOrders = createAsyncThunk(
    "order/getAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/order/get-orders`);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)

export const getOrderDetails = createAsyncThunk(
    "order/getOrderDetails",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/order/get/${orderId}`);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)


export const updateOrderStatus = createAsyncThunk(
    "order/updateOrderStatus",
    async ({orderId,orderStatus},{rejectWithValue})=>{
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/order/update-status/${orderId}/${orderStatus}`);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)


const adminOrderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{
        resetOrderDetails:(state)=>{
            console.log("resetOrderDetails");
            
            state.orderDetails={};
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllOrders.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderList = action.payload.data;
        })
        .addCase(getAllOrders.rejected, (state) => {
            state.isLoading = false;
            state.orderList = [];
        }).addCase(getOrderDetails.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getOrderDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        })
        .addCase(getOrderDetails.rejected, (state) => {
            state.isLoading = false;
            state.orderDetails = {};
        })
       
    }
}) 


export const {resetOrderDetails} = adminOrderSlice.actions;

export default adminOrderSlice.reducer