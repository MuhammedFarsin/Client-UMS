import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/userSlice";
import axiosInstance from "../../axios/axiosInstance";
import "./Login.css"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!username) {
      newErrors.email = "Email is required";
    }
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axiosInstance.post("/login", {
        username,
        password,
      });

      console.log(response.data);

      dispatch(login());
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    
      <div className="signin-container">
        <h1 className="heading">Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              name="username"
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="username" className="floating-label">
              Username
            </label>
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="input-container">
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              placeholder=" "
              autoComplete="current-password"
              required
            />
            <label htmlFor="password" className="floating-label">
              Password
            </label>
          </div>
          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>
        <p className="signup-link">
          New user? <Link to="/signup">Sign Up here</Link>
        </p>
      </div>
     
  );
}

export default Login;
