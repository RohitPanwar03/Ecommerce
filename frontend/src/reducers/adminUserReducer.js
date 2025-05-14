import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/user/getAll-users");
      return data.users;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
const adminUserSlice = createSlice({
  name: "allUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrors } = adminUserSlice.actions;
export default adminUserSlice.reducer;
