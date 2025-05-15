import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAdminProducts = createAsyncThunk(
  "getAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/products/admin/products");
      return data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const newAdminProduct = createAsyncThunk(
  "newAdminProduct",
  async (myForm, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/products/create-product",
        myForm,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteProductsAdmin = createAsyncThunk(
  "deleteProductsAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/products/delete/${id}`);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const adminNewProductSlice = createSlice({
  name: "newProduct",
  initialState: {
    success: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearNewProductError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newAdminProduct.pending, (state, action) => {
      state.success = false;
      state.loading = true;
    });
    builder.addCase(newAdminProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(newAdminProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    });
  },
});

const deleteProductSlice = createSlice({
  name: "deleteProducts",
  initialState: {
    isDeleted: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearDeleteErrors: (state) => {
      state.error = null;
    },
    clearisDeleted: (state) => {
      state.isDeleted = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProductsAdmin.pending, (state, action) => {
      state.isDeleted = false;
      state.loading = true;
    });
    builder.addCase(deleteProductsAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    });
    builder.addCase(deleteProductsAdmin.rejected, (state, action) => {
      state.isDeleted = false;
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Exporting Actions
export const { clearErrors } = adminProductSlice.actions;
export const { clearNewProductError, clearSuccess } =
  adminNewProductSlice.actions;
export const { clearDeleteErrors, clearisDeleted } = deleteProductSlice.actions;
// Exporting Reducers
export const adminProductReducer = adminProductSlice.reducer;
export const adminNewProductReducer = adminNewProductSlice.reducer;
export const deleteProductsReducer = deleteProductSlice.reducer;
