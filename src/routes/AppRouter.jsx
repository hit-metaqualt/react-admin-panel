import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import PrivateRoute from "./PrivateRoute";
import AuthRedirect from "./AuthRedirect";
import Profile from "../pages/admin/Profile";
import UserDocuments from "../pages/admin/UserDocuments";
import CommonTable from "../components/CommonTable";
import NotFound from "../pages/public/NotFound";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<CommonTable />} />
        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path="/user-document/:userId"
          element={
            <PrivateRoute>
              <UserDocuments />
            </PrivateRoute>
          }
        />

        {/* Private Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
