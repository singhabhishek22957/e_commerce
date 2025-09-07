import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviewList: [],
};

export const addProductReview = createAsyncThunk(
  "review/addProductReview",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shop/review/add`,
        formData
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductReview = createAsyncThunk(
  "review/getProductReview",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/shop/review/get/${productId}`
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
)

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewList = action.payload.data;
      })
      .addCase(getProductReview.rejected, (state) => {
        state.isLoading = false;
        state.reviewList = [];
      });
  },
});

export default reviewSlice.reducer;
