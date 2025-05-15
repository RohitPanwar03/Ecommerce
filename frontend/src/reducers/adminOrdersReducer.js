import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk(
  "getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("https://ecommerce-7079.onrender.com/api/v1/order/getAll-Orders",                        
        {  withCredentials: true}
    );
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "getOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`https://ecommerce-7079.onrender.com/api/v1/order/single-order/${id}`,{
        {  withCredentials: true }
        
      });
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "updateOrderStatus",
  async ({ orderId, myForm }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `https://ecommerce-7079.onrender.com/api/v1/order/update-Order/${orderId}`,
        myForm,
       { headers: { "Content-Type": "application/json" } , { withCredentials: true }}
    
      );
      return data.success;
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

const getOrderDetailSlice = createSlice({
  name: "getOrderDetail",
  initialState: {
    order: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderDetailError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderDetails.pending, (state, action) => {
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

const updateOrderSlice = createSlice({
  name: "updateOrder",
  initialState: {
    success: false,
    loading: false,
    error: null,
  },
  reducers: {
    updateOrderErrors: (state) => {
      state.error = null;
    },
    updateOrderSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateOrderStatus.pending, (state, action) => {
      state.success = false;
      state.loading = true;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrors } = adminOrderSlice.actions;
export const { clearOrderDetailError } = getOrderDetailSlice.actions;
export const { updateOrderErrors, updateOrderSuccess } =
  updateOrderSlice.actions;

export const adminOrdersReducer = adminOrderSlice.reducer;
export const getOrderDetailReducer = getOrderDetailSlice.reducer;
export const updateOrderReducer = updateOrderSlice.reducer;
