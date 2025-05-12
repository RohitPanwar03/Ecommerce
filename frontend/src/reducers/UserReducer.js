import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerNewUser = createAsyncThunk(
  "registerNewUser",
  async ({ name, email, password, avatar }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.post(
        "/api/v1/user/register",
        { name, email, password, avatar },
        config
      );
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post(
        "/api/v1/user/login",
        { email, password },
        config
      );
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "loadUser",
  async (__, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/v1/user/me");
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "updateUserPassword",
  async (FormData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.put(
        "/api/v1/user/update-user-password",
        FormData,
        config
      );
      return res.data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "logOut",
  async (__, { rejectWithValue }) => {
    try {
      await axios.get("/api/v1/user/logout", {
        withCredentials: true,
      });
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async ({ name, email, avatar }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await axios.put(
        "/api/v1/user/update-user-details",
        {
          name,
          email,
          avatar,
        },
        config
      );
      return res.data.success;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const UserReducer = createSlice({
  name: "User",
  initialState: {
    user: {},
    loading: false,
    isAuthenticated: false,
    error: null,
    isUpdated: false,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearisUpdated: (state) => {
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerNewUser.pending, (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(registerNewUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(registerNewUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
      state.isAuthenticated = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    });
    builder.addCase(loadUser.pending, (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateUserPassword.pending, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
    });
    builder.addCase(updateUserPassword.fulfilled, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(updateUserPassword.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateUserProfile.pending, (state, action) => {
      state.loading = true;
      state.isUpdated = false;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
      state.isUpdated = action.payload;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false;
    });
  },
});

export const { clearErrors, clearisUpdated } = UserReducer.actions;
export default UserReducer.reducer;
