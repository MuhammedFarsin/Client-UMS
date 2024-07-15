import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import "./SignUp.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!phone) newErrors.phone = "Phone number is required";
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
      const response = await axiosInstance.post("/signup", {
        username,
        email,
        phone,
        password,
      });
      console.log(response.data);
      // Handle successful response

      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };
  return (
    <div className="SignUp-container">
      <h1 className="signup-heading">Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
          {errors.username && (
            <p className="text-red-600 text-sm">{errors.username}</p>
          )}
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-group">
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            placeholder=" "
            autoComplete="off"
            required
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-group">
          <input
            className="input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            placeholder=" "
            autoComplete="off"
            required
          />
          {errors.phone && (
            <p className="text-red-600 text-sm">{errors.phone}</p>
          )}
          <label htmlFor="phone">Phone</label>
        </div>
        <div className="form-group">
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
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="submit-button">
          Sign Up
        </button>
        <p className="signup-link">
          Already SignIn? <Link to="/">Sign In here</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
