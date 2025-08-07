import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading :false,
    productsList:[],
}

export const addNewProducts = createAsyncThunk("products/addNewProducts", async(formData,{rejectWithValue})=>{
   try {
     const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/product/add-product`, formData,{
         withCredentials: true,
         headers:{
             "Content-Type":"application/json",
         }
     });
     return response.data;
   } catch (error) {

    console.log("error", error);
    return rejectWithValue(error.response.data);

    
   }
})

export const getAllProducts = createAsyncThunk("products/getAllProducts", async(_,{rejectWithValue})=>{
   try {
     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/product/get-all-products`);
     return response.data;
   } catch (error) {

    console.log("error", error);
    return rejectWithValue(error.response.data);

    
   }
})

export const updateProduct = createAsyncThunk("products/updateProduct", async({id,formData},{rejectWithValue})=>{
   try {
    
     const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/product/update-product/${id}`, formData,{
         withCredentials: true,
         headers:{
             "Content-Type":"application/json",
         }
         
     });
     return response.data;
   } catch (error) {

    console.log("error", error);
    return rejectWithValue(error.response.data);

    
   }
})


export const deleteProduct = createAsyncThunk("products/deleteProduct", async({id},{rejectWithValue})=>{
   try {
     const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/product/delete-product/${id}`);
     return response.data;
   } catch (error) {

    console.log("error", error);
    return rejectWithValue(error.response.data);

    
   }
})


export const getProductById = createAsyncThunk("products/getProductById", async({id},{rejectWithValue})=>{
   try {
     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/product/get-product/${id}`);
     return response.data;
   } catch (error) {

    console.log("error", error);
    return rejectWithValue(error.response.data);

    
   }
})


const adminProductsSlice = createSlice({
    name: "adminProduct",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

      builder.addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload.data;

      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productsList = [];
      }).addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      }).addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = state.productsList.map((product) => {
          if (product._id === action.payload.data._id) {
            return action.payload.data;
          }
          return product;
        });
      }).addCase(updateProduct.rejected, (state) => {
        state.isLoading = false;
        state.productsList = [];
      }).addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      }).addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = state.productsList.filter((product) => product._id !== action.payload.data._id);
      }).addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
        state.productsList = [];
      })
    }
})

export const {setProductList} = adminProductsSlice.actions;
export default adminProductsSlice.reducer;