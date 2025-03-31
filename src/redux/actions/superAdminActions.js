import {
    createAdminStart,
    createAdminSuccess,
    createAdminFailure,
    fetchAdminsStart,
    fetchAdminsSuccess,
    fetchAdminsFailure,
  } from "../slices/superAdminSlice";
  
  // const API_BASE_URL = "http://localhost:5000/api";
  // const API_BASE_URL =  "https://whatsapp-bot-backend-hz1v.onrender.com/api"; // Default fallback for local development
  const API_BASE_URL = `https://whatsapp-pdf-maker.onrender.com/api`; 

// const API_BASE_URL=`/api`

  
  // ✅ Action to create a new admin
  export const createAdmin = (adminData) => async (dispatch) => {
    dispatch(createAdminStart());
    try {
      const response = await fetch(`${API_BASE_URL}/admin/create-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create admin");
      }
  
      const data = await response.json();
      dispatch(createAdminSuccess(data)); // Add new admin to state
    } catch (error) {
      console.error("Create Admin Error:", error.message);
      dispatch(createAdminFailure(error.message));
    }
  };
  
  // ✅ Action to fetch all admins under a Super Admin
  export const fetchAdmins = (superAdminId) => async (dispatch) => {
    dispatch(fetchAdminsStart());
    try {
      const response = await fetch(`${API_BASE_URL}/super-admin/admins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ superAdminId:superAdminId }),
      });

  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch admins");
      }
  

      const data = await response.json();

      dispatch(fetchAdminsSuccess(data)); // Store admins in state
    } catch (error) {
      console.error("Fetch Admins Error:", error.message);
      dispatch(fetchAdminsFailure(error.message));
    }
  };
  