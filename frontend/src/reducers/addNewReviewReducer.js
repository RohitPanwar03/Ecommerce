import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewReview = createAsyncThunk(
  "addNewReview",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/v1/products/review`, {
        rating: data.rating,
        comment: data.comment,
        productId: data.id,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addNewReviewReducer = createSlice({
  name: "newReview",
  initialState: {
    review: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addNewReview.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addNewReview.fulfilled, (state, action) => {
      state.loading = false;
      state.review = action.payload;
    });
    builder.addCase(addNewReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default addNewReviewReducer.reducer;
