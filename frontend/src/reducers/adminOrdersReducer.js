import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk(
  "getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/order/getAll-Orders");
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrors } = adminOrderSlice.actions;

export const adminOrdersReducer = adminOrderSlice.reducer;
