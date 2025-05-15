import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("https://ecommerce-7079.onrender.com/api/v1/user/getAll-users");
      return data.users;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`https://ecommerce-7079.onrender.com/api/v1/user/delete-user/${id}`);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`https://ecommerce-7079.onrender.com/api/v1/user/getSingle-user/${id}`);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const updateUserRole = createAsyncThunk(
  "updateUserRole",
  async ({ userId, myForm }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `https://ecommerce-7079.onrender.com/api/v1/user/update-user-role/${userId}`,
        myForm,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminUserSlice = createSlice({
  name: "allUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const deleteUserSlice = createSlice({
  name: "deleteUsers",
  initialState: {
    isDeleted: false,
    loading: false,
    error: null,
  },
  reducers: {
    deleteUserErrors: (state) => {
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isDeleted = false;
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const getUserDetailSlice = createSlice({
  name: "getUserDetail",
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    deleteUserErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const updateUserRoleSlice = createSlice({
  name: "updateUserRole",
  initialState: {
    success: false,
    loading: false,
    error: null,
  },
  reducers: {
    updateUserErrors: (state) => {
      state.error = null;
    },
    updateUserSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserRole.pending, (state, action) => {
      state.success = false;
      state.loading = true;
    });
    builder.addCase(updateUserRole.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
    });
    builder.addCase(updateUserRole.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const { clearErrors } = adminUserSlice.actions;
export const { deleteUserErrors, deleteUserSuccess } = deleteUserSlice.actions;
export const { clearUserDetailError } = getUserDetailSlice.actions;
export const { updateUserErrors, updateUserSuccess } =
  updateUserRoleSlice.actions;

// Exporting Reducers
export const deleteUserReducer = deleteUserSlice.reducer;
export const adminUserReducer = adminUserSlice.reducer;
export const userDetailsReducer = getUserDetailSlice.reducer;
export const updateUserRoleReducer = updateUserRoleSlice.reducer;
