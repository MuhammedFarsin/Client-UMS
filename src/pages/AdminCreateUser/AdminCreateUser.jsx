import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { toast } from "react-toastify";
import "./AdminCreateUser.css";

function AdminCreateUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
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
      const newUser = {
        username,
        email,
        phone,
        password,
      };
      await axiosInstance.post("/admin/create-user", newUser);
      navigate("/admin-dashboard");
      toast.success("User created successfully!");
    } catch (error) {
      toast.error("Failed to create user");
      console.log(error.message);
    }
  };

  return (
    <div className="admin-create-user-container">
      <form onSubmit={handleSubmit} className="admin-create-user-form">
        <h2>Create New User</h2>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default AdminCreateUser;
