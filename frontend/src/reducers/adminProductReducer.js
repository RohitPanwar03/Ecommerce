import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAdminProducts = createAsyncThunk(
  "getAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("https://ecommerce-7079.onrender.com/api/v1/products/admin/products",                             
        { withCredentials: true }
       );
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
      const { data } = await axios.post(
        "https://ecommerce-7079.onrender.com/api/v1/products/create-product",
        myForm,
      { 
        headers: { "Content-Type": "application/json" }, 
        withCredentials: true  }
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
      const { data } = await axios.delete(`https://ecommerce-7079.onrender.com/api/v1/products/delete/${id}`,                        
        { withCredentials: true });
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "getProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-7079.onrender.com/api/v1/products/getSingle-product/${productId}`,
        { withCredentials: true }
        
      );
      return data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ productId, myForm }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `https://ecommerce-7079.onrender.com/api/v1/products/update/${productId}`,
        myForm,
      { headers: { "Content-Type": "application/json" } ,  withCredentials: true }
      );
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

const getProductDetailSlice = createSlice({
  name: "getProductDetails",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearProductDetailError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state, action) => {
      state.loading = true;
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

const updateProductSlice = createSlice({
  name: "updateProducts",
  initialState: {
    success: false,
    loading: false,
    error: null,
  },
  reducers: {
    updateProductErrors: (state) => {
      state.error = null;
    },
    updateProductSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProduct.pending, (state, action) => {
      state.success = false;
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

// Exporting Actions
export const { clearErrors } = adminProductSlice.actions;
export const { clearNewProductError, clearSuccess } =
  adminNewProductSlice.actions;
export const { clearDeleteErrors, clearisDeleted } = deleteProductSlice.actions;
export const { clearProductDetailError } = getProductDetailSlice.actions;
export const { updateProductErrors, updateProductSuccess } =
  updateProductSlice.actions;

// Exporting Reducers
export const adminProductReducer = adminProductSlice.reducer;
export const adminNewProductReducer = adminNewProductSlice.reducer;
export const deleteProductsReducer = deleteProductSlice.reducer;
export const productDetailsReducer = getProductDetailSlice.reducer;
export const updateProductReducer = updateProductSlice.reducer;
