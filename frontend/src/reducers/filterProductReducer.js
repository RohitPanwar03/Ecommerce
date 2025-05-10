import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductByFilter = createAsyncThunk(
  "getProductByFilter",
  async (
    keyword = "",
    currentPage = 1,
    price = [0, 25000],
    category,
    ratings = 0,
    { rejectWithValue }
  ) => {
    try {
      let link = `/api/v1/products/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/products/products?keyword=${keyword}&page=${currentPage}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      }
      const res = await axios.get(link);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const filterProductReducer = createSlice({
  name: "filterProduct",
  initialState: {
    products: [],
    productCount: 0,
    filteredProductCount: 0,
  },
  extraReducers: (builder) => {
    builder.addCase(getProductByFilter.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getProductByFilter.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
      state.filteredProductCount = action.payload.filteredProductCount;
    });
    builder.addCase(getProductByFilter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default filterProductReducer.reducer;
