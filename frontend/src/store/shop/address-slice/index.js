import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading:false,
    addressList:[],
}

export const addNewAddress = createAsyncThunk(
    'address/addNewAddress',
    async(formData,{rejectWithValue})=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/shop/address/add`,formData);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)


export const updateAddress = createAsyncThunk(
    'address/updateAddress',
    async({addressData,addressId, userId},{rejectWithValue})=>{
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/shop/address/update/${userId}/${addressId}`,addressData);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)


export const fetchAddress = createAsyncThunk(
    'address/fetchAddress',
    async( userId,{rejectWithValue})=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shop/address/get/${userId}`);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)


export const deleteAddress = createAsyncThunk(
    'address/deleteAddress',
    async( {userId, addressId},{rejectWithValue})=>{
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/shop/address/delete/${userId}/${addressId}`);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)




const addressSlice = createSlice({
    name:"address",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addNewAddress.pending, (state) => {
            state.isLoading = true;
        }).addCase(addNewAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action.payload.data;
        }).addCase(addNewAddress.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
        }).addCase(fetchAddress.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action.payload.data;
        }).addCase(fetchAddress.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
        }).addCase(updateAddress.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action.payload.data;
        }).addCase(updateAddress.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
        }).addCase(deleteAddress.pending, (state) => {
            state.isLoading = true;
        })
        
    }
})

export default addressSlice.reducer