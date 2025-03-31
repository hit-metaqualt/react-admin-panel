import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  role: null,
  user: null, // Store user data separately from the role
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      if (action.payload.token && action.payload.user) {
        state.token = action.payload.token;
        state.user = action.payload.user; // Store user data separately
        state.role = action.payload.user.role; // Set role separately
        state.isAuthenticated = true;
      } else {
        console.error("Invalid payload structure in loginSuccess:", action.payload);
        state.isAuthenticated = false;
      }
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.user = null; // Clear user data
      state.role = null; // Clear role data
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    setUserFromStorage: (state, action) => {
      if (action.payload.token && action.payload.user) {
        state.token = action.payload.token;
        state.user = action.payload.user; // Ensure user data is set
        state.role = action.payload.user.role; // Ensure role is set separately
        state.isAuthenticated = true;
      } else {
        console.error("Invalid payload structure in setUserFromStorage:", action.payload);
        state.isAuthenticated = false;
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  setUserFromStorage,
} = authSlice.actions;

export default authSlice.reducer;
