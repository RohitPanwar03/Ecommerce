import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetails = createAsyncThunk(
  "getProducts",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`https://ecommerce-7079.onrender.com/api/v1/products/getSingle-product/${id}`);
      return res.data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const productDetailReducer = createSlice({
  name: "productDetails",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productDetailReducer.reducer;
