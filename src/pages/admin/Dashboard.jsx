import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import AllAdmin from "../../components/AllAdmin";
import AllUser from "../../components/AllUser";
import { useDispatch, useSelector } from "react-redux";
import { setUserFromStorage } from "../../redux/slices/authSlice"; // Import your action
import { ToastContainer } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { role, token } = useSelector((state) => state.auth);



  
  


  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");

    if (storedRole && storedToken) {
      dispatch(setUserFromStorage({ token: storedToken, user: { role: storedRole } }));
    }
  }, [dispatch]);

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  console.log("Role:", role);

  return (
    <>
     <ToastContainer />
      <Navbar />
      
      {role == "superAdmin" && <AllAdmin />}
      {role === "admin" && <AllUser />}
    </>
  );
};

export default Dashboard;
