import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admins: [],
  loading: false,
  error: null,
};

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState,
  reducers: {
    createAdminStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createAdminSuccess: (state, action) => {
      state.loading = false;
      state.admins.push(action.payload); // Add new admin to the list
    },
    createAdminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAdminsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAdminsSuccess: (state, action) => {
      state.loading = false;
      state.admins = action.payload; // Set fetched admins
    },
    fetchAdminsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createAdminStart,
  createAdminSuccess,
  createAdminFailure,
  fetchAdminsStart,
  fetchAdminsSuccess,
  fetchAdminsFailure,
} = superAdminSlice.actions;

export default superAdminSlice.reducer;
