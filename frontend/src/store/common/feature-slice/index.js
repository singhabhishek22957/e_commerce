import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading:false,
    featureImages:[]
};


export const addFeatureImage = createAsyncThunk(
    "feature/addFeatureImage",
    async(image,{rejectWithValue})=>{
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/common/feature/add`,{image});
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)


export const getFeatureImages = createAsyncThunk(
    "feature/getFeatureImages",
    async(_,{rejectWithValue})=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/common/feature/get`);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }   
    }
)



const featureSlice = createSlice({
    name:"feature",
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(getFeatureImages.pending, (state) => {
            state.isLoading = true;
        }).addCase(getFeatureImages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.featureImages = action.payload.data;
        }).addCase(getFeatureImages.rejected, (state) => {
            state.isLoading = false;
            state.featureImages = [];
        })
        
    }

})


export default featureSlice.reducer