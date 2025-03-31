// PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute; // Ensure this is a default export




// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { setUserFromStorage } from "../redux";

// const PrivateRoute = ({ children }) => {
//   const dispatch = useDispatch();
//   const { token, role, isAuthenticated } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (token) {
//       fetchUserData();
//     }
//   }, [token, dispatch]);

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/me', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       if (data.success) {
//         dispatch(setUserFromStorage({
//           token,
//           role: data.user.role,
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;
