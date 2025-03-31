import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRouter from "./routes/AppRouter";
import { setUserFromStorage } from "./redux/slices/authSlice";

const Index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(setUserFromStorage({ token, user: JSON.parse(user) }));
    }
  }, [dispatch]);
  return (
    <>
      <AppRouter />
    </>
  );
};

export default Index;
