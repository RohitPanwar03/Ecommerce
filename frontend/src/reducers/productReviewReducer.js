import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductReviews = createAsyncThunk(
  "getProducts",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/v1/products/getSingle-product/${id}`);
      return res.data.product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productReviewReducer = createSlice({
  name: "productReviews",
  initialState: {
    reviews: [],
    loading: true,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getProductReviews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productReviewReducer.reducer;
