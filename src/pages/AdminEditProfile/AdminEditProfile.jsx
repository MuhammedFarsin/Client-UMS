import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import "./AdminEditProfile.css";

function AdminEditProfile() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get(`/admin/edit-user/${userId}`);
        const user = response.data;
        setUserData(user);
        setUsername(user.username);
        setEmail(user.email);
        setPhone(user.phone);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserDetails();
  }, [userId]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

    if (file && !validImageTypes.includes(file.type)) {
      toast.error("Only image files (png, jpeg, gif) are allowed");
      return;
    }

    if (file) {
      setProfilePic(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const data = {
      username,
      email,
      phone,
    };

    try {
      if (profilePic) {
        const formData = new FormData();
        formData.append("file", profilePic);
        formData.append("upload_preset", "twkqtx19");

        const uploadRes = await axiosInstance.post(
          "https://api.cloudinary.com/v1_1/dsmn3oq5s/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        data.profilePic = uploadRes.data.secure_url;
      }

      await axiosInstance.patch(`/admin/update-edit-user/${userId}`, data);

      navigate("/admin-dashboard");
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="admin-edit-profile-container">
      {userData ? (
        <div className="admin-edit-profile-box">
          <div className="admin-profile-image-container">
            <div className="admin-profile-image" onClick={handleImageClick}>
              {profilePic ? (
                <img src={URL.createObjectURL(profilePic)} alt="Profile" />
              ) : userData.profilePic ? (
                <img src={userData.profilePic} alt="Profile" />
              ) : (
                <div className="admin-placeholder-icon">
                  <FaCamera />
                </div>
              )}
              <input
                type="file"
                className="admin-file-input"
                onChange={handleProfilePicChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="admin-edit-form">
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="admin-edit-input"
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
                className="admin-edit-input"
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
                className="admin-edit-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="admin-edit-submit">
              Save Changes
            </button>
          </form>
        </div>
      ) : (
        <h1 className="admin-login-message">Loading user data...</h1>
      )}
    </div>
  );
}

export default AdminEditProfile;
