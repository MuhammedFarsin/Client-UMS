import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import "./SignUp.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const usernameRegex = /^[A-Za-z]+$/;

    if (!username.trim()) {
      toast.error("Username is required");
      return false;
    }
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Phone number should be exactly 10 digits");
      return false;
    }

    if (!usernameRegex.test(username) || /^(.)\1+$/.test(username)) {
      toast.error("Username should contain only letters and not be repetitive");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
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
      // Show success message
      toast.success("Signup successful!");
      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error(error);
      // Handle error response
      toast.error("Signup failed. Please try again.");
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
