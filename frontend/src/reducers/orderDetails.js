import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrderDetails = createAsyncThunk(
  "getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`https://ecommerce-7079.onrender.com/api/v1/order/single-order/${id}`,
                                      
        { withCredentials: true });
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
const orderDetailSlice = createSlice({
  name: "orderDetails",
  initialState: {
    order: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrors } = orderDetailSlice.actions;
export default orderDetailSlice.reducer;
