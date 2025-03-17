import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import superAdminReducer from "./slices/superAdminSlice";
import { customMiddleware } from "./middleware"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    superAdmin: superAdminReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware), // ✅ Add middleware
  // devTools: process.env.NODE_ENV !== "production", 
});

export default store;
