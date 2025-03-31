import {
  createUserStart,
  createUserSuccess,
  createUserFailure,
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  addDocumentStart,
  addDocumentSuccess,
  addDocumentFailure,
  fetchDocumentsStart,
  fetchDocumentsSuccess,
  fetchDocumentsFailure,
  editUserStart,
  editUserSuccess,
  editUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  deleteDocumentStart,
  deleteDocumentSuccess,
  deleteDocumentFailure,
} from "../slices/userSlice";
import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/api"; // Default fallback for local development
const API_BASE_URL =  "https://whatsapp-bot-backend-hz1v.onrender.com/api"; // Default fallback for local development
// const API_BASE_URL=`/api`


export const createUser = (userData,authToken) => async (dispatch) => {
  dispatch(createUserStart());
  try {
    const response = await fetch(`${API_BASE_URL}/admin/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(createUserSuccess(data));
      return data;
    } else {
      dispatch(createUserFailure(data.message || "Failed to create user"));
      return data;
    }
  } catch (error) {
    dispatch(createUserFailure("An error occurred while creating user."));
  }
};

export const fetchAllUsers = (token) => async (dispatch) => {
  dispatch(fetchUsersStart());
  try {
    const response = await fetch(`${API_BASE_URL}/admin/fetch-all-user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(fetchUsersSuccess(data));
    } else {
      dispatch(fetchUsersFailure(data.message || "Failed to fetch users"));
    }
  } catch (error) {
    dispatch(fetchUsersFailure("An error occurred while fetching users."));
  }
};

export const addUserDocument = (documentData, token) => async (dispatch) => {
  dispatch(addDocumentStart());

  try {
    if (!token) {
      throw new Error("Authentication failed. Admin ID or token is missing.");
    }

    const response = await fetch(`${API_BASE_URL}/admin/add-document`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: documentData, // Directly send FormData
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to add document");
    }
    dispatch(addDocumentSuccess(data));
    return data;
  } catch (error) {
    dispatch(addDocumentFailure(error.message));
  }
};

export const fetchUserDocuments = (userId, token) => async (dispatch) => {
  dispatch(fetchDocumentsStart());
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/user/all-documents/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      dispatch(fetchDocumentsSuccess({ userId, documents: data }));
    } else {
      dispatch(
        fetchDocumentsFailure(data.message || "Failed to fetch documents")
      );
    }
  } catch (error) {
    dispatch(
      fetchDocumentsFailure("An error occurred while fetching documents.")
    );
  }
};

export const editUser = (userId, userData, token) => async (dispatch) => {
  dispatch(editUserStart());
  try {
    const response = await fetch(`${API_BASE_URL}/admin/user/edit/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(editUserSuccess(data));
    } else {
      dispatch(editUserFailure(data.message || "Failed to edit user"));
    }
  } catch (error) {
    dispatch(editUserFailure("An error occurred while editing user."));
  }
};

export const deleteUser = (userId, token) => async (dispatch) => {
  dispatch(deleteUserStart());
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/user/delete/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      dispatch(deleteUserSuccess(userId));
    } else {
      const data = await response.json();
      dispatch(deleteUserFailure(data.message || "Failed to delete user"));
    }
  } catch (error) {
    dispatch(deleteUserFailure("An error occurred while deleting user."));
  }
};

export const deleteDocument = (documentId, token) => async (dispatch) => {
  try {
    dispatch(deleteDocumentStart());

    const response = await axios.delete(
      `${API_BASE_URL}/admin/delete-document/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch(deleteDocumentSuccess(documentId));

      return response.data;
    }
  } catch (error) {
    dispatch(
      deleteDocumentFailure(
        error.response?.data?.message || "Failed to delete document"
      )
    );
  }
};
