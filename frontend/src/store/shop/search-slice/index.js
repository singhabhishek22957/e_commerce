import axios from "axios";

import { createSlice, createAsyncThunk }from "@reduxjs/toolkit";




const initialState = {
    isLoading:false,
    searchResult :[]
}

export const searchActions = createAsyncThunk(
    "search/searchActions",
    async(keyword,{rejectWithValue})=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/shop/search/${keyword}`);
            return response.data;
        } catch (error) {
            console.log("error", error);
            return rejectWithValue(error.response.data);
        }
    }
)

const searchSlice = createSlice({
    name:"search",
    initialState,
    reducers: {
        resetSearchResult: (state) => {
            state.searchResult = [];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(searchActions.pending, (state) => {
            state.isLoading = true;
        }).addCase(searchActions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.searchResult = action.payload.data;
        }).addCase(searchActions.rejected, (state) => {
            state.isLoading = false;
            state.searchResult = [];
        })
        
    }
})

export const {resetSearchResult} = searchSlice.actions
export default searchSlice.reducer;