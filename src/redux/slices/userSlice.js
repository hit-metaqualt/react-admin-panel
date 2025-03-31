import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  documents: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      if (action.payload && action.payload.users) {
        state.users = action.payload.users;
      }
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addDocumentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addDocumentSuccess: (state, action) => {
      state.loading = false;
      state.documents[action.payload.userId] = action.payload;
    },
    addDocumentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchDocumentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDocumentsSuccess: (state, action) => {
      state.loading = false;
      state.documents[action.payload.userId] = action.payload.documents;
    },
    fetchDocumentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    editUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    editUserSuccess: (state, action) => {
      state.loading = false;
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    editUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ➕ Added Delete Document Actions
    deleteDocumentStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteDocumentSuccess: (state, action) => {
      state.loading = false;
      delete state.documents[action.payload]; // Remove document from state
    },
    deleteDocumentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createUserStart, createUserSuccess, createUserFailure,
  fetchUsersStart, fetchUsersSuccess, fetchUsersFailure,
  addDocumentStart, addDocumentSuccess, addDocumentFailure,
  fetchDocumentsStart, fetchDocumentsSuccess, fetchDocumentsFailure,
  editUserStart, editUserSuccess, editUserFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
  deleteDocumentStart, deleteDocumentSuccess, deleteDocumentFailure
} = userSlice.actions;

export default userSlice.reducer;
