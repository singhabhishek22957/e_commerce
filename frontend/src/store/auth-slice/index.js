import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const backend_url = "http://localhost:3000";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backend_url}/api/auth/register`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk("auth/login", async (formData, { rejectWithValue }) => {
  console.log("your are try to login  ");
  
  try {
    console.log("sending request for login");
    
    const response = await axios.post(`${backend_url}/api/auth/login`, formData, {
      withCredentials: true,
    });
    console.log("response for login", response);
    
    return response.data;
  } catch (error) {
    console.log("error for login", error);
    console.log("error", error);
    return rejectWithValue(error.response.data);
  
  }

  console.log("login end point hit");
  
});

export const LogoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${backend_url}/api/auth/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
    return rejectWithValue(error.response.data);
  }
});



// check auth 
export const checkAuth = createAsyncThunk(
  "auth/check-auth", async(formData,{rejectWithValue})=>{
    try {
      const response = await axios.get(`${backend_url}/api/auth/check-auth`, {
        withCredentials: true,
        headers:{
            'Cache-Control': 'no-cache, no-store, must-revalidate , proxy-revalidate',
            
        }
      });
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  })

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("action", action);

        state.isLoading = false;
        state.user = !action.payload.success ? null : action.payload.data;
        state.isAuthenticated = action.payload.success ? true: false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log("action", action);
        state.isLoading = false;
        state.user = !action.payload.success ? null : action.payload.data;
        state.isAuthenticated = action.payload.success ? true: false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }).addCase(LogoutUser.fulfilled, (state,action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
