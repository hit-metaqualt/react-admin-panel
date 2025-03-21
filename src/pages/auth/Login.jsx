import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/authAction";
import { toast } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toast

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState(""); // State for general form error

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const validateFields = () => {
    let errors = { username: "", password: "" };
    let isValid = true;

    if (!username.trim()) {
      errors.username = "Username is required";
      isValid = false;
    } else if (username.length < 0) {
      errors.username = "Username must be at least 4 characters";
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      const res = await dispatch(loginUser({ username, password }));
      if (res.success) {
      toast.success("Logout successfully!", { autoClose: 2000, position: "top-center"  });     
        
        navigate("/dashboard");
      } else {
        setFormError(res.message || "Login failed."); 
        toast.error(res.message || "Login failed."); 
      }
    } catch (error) {
      setFormError(error.message || "Login failed."); 
      toast.error(error.message || "Login failed."); 
    }
  };

  return (
    <section className="section-height">
      <div className="main-section">
        <div className="image-section">
          <img src="side-image.jpg" alt="side image" />
        </div>
        <div className="login-container">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="">
              <label htmlFor="username" className="mb-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="form-control mb-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {fieldErrors.username && <p style={{ color: "red" }}>{fieldErrors.username}</p>}
            </div>

            <div className="">
              <label htmlFor="password" className="mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="form-control mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {fieldErrors.password && <p style={{ color: "red" }}>{fieldErrors.password}</p>}
            </div>

            {formError && <p style={{ color: "red", textAlign: "center" }}>{formError}</p>} {/* Display form error */}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
