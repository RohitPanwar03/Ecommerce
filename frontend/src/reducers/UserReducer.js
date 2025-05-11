import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerNewUser = createAsyncThunk(
  "registerNewUser",
  async (data, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.post("/api/v1/user/register", data, config);
      return res.data.user;
    } catch (error) {
      rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log(email, password);
      const res = await axios.post("/api/v1/user/login", { email, password });
      return res.data.user;
    } catch (error) {
      rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const UserReducer = createSlice({
  name: "User",
  initialState: {
    user: {},
    loading: false,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerNewUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerNewUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(registerNewUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.payload;
      state.isAuthenticated = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.user = { ...state.user };
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.isAuthenticated = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrors } = UserReducer.actions;
export default UserReducer.reducer;
