import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create New Order
export const newOrder = createAsyncThunk(
  "newOrder",
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("https://ecommerce-7079.onrender.com/api/v1/order/new", order, { headers: { "Content-Type": "application/json" },  withCredentials: true  });
      
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get My Order
export const myOrders = createAsyncThunk(
  "myOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("https://ecommerce-7079.onrender.com/api/v1/order/myOrder", { withCredentials: true });
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "Order",
  initialState: {
    order: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(newOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(newOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(myOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(myOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(myOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrors } = orderSlice.actions;
export default orderSlice.reducer;
