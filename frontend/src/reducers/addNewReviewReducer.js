import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewReview = createAsyncThunk(
  "addNewReview",
  async ({ rating, comment, productId }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`https://ecommerce-7079.onrender.com/api/v1/products/review`, {
        rating,
        comment,
        productId,
      }
                                  
        { headers: { "Content-Type": "application/json" },  withCredentials: true }
     );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const addNewReviewReducer = createSlice({
  name: "newReview",
  initialState: {
    success: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewReview.pending, (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(addNewReview.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(addNewReview.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const { clearSuccess, clearErrors } = addNewReviewReducer.actions;
export default addNewReviewReducer.reducer;
