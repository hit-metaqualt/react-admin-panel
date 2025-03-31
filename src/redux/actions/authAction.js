// src/redux/actions/authActions.js
import { loginStart, loginSuccess, loginFailure, logoutSuccess } from "../slices/authSlice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = `https://whatsapp-bot-backend-hz1v.onrender.com/api`; 
// const API_BASE_URL=`/api`

export const loginUser = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData ;
    }

    const data = await response.json();

    // Store token and user data in Redux and localStorage
    dispatch(loginSuccess({ token: data.token, user: data.user }));
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)); // Store user object in localStorage
  } catch (error) {
    console.error("Login Error:", error.message);
    dispatch(loginFailure(error.message || "An error occurred while logging in."));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
      const token = localStorage.getItem("token");
      if (!token) {
          throw new Error("No token found, user not logged in.");
      }

      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Logout failed");
      }

      dispatch(logoutSuccess());
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.setItem("user");
  } catch (error) {
      console.error("Logout Error:", error.message);
  }
};