import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axios/axiosInstance";
import { setUser } from "../../redux/slices/userSlice";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import "./EditProfile.css"; // Adjust the path if necessary

function EditProfile() {
  const user = useSelector((state) => state.user.user);

  const [username, setUsername] = useState(user.username || "");
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      // If there is a profile picture to upload
      if (profilePic) {
        const formData = new FormData();
        formData.append("file", profilePic); // Ensure the file parameter is named correctly
        formData.append("upload_preset", "twkqtx19"); // Replace with your Cloudinary upload preset

        // Log the FormData to ensure it's correctly formatted
        for (let pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        // Upload the image to Cloudinary
        const uploadRes = await axiosInstance.post(
          "https://api.cloudinary.com/v1_1/dsmn3oq5s/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Add the Cloudinary URL to the data object
        data.profilePic = uploadRes.data.secure_url;
      }

      // Send the data object to your backend
      const response = await axiosInstance.patch(
        `/editprofile/${user._id}`,
        data
      );

      dispatch(setUser(response.data));
      toast.success("Profile updated successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error updating profile:", error);

      if (error.response) {
        console.error("Cloudinary error status:", error.response.status);
        console.error("Cloudinary error data:", error.response.data);
      }
      toast.error("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="userprofile-home-container">
      {user ? (
        <div className="userprofile-detailing-box">
          <div className="userprofile-profile-image-container">
            <div
              className="userprofile-profile-image"
              onClick={handleImageClick}
            >
              {profilePic ? (
                <img src={URL.createObjectURL(profilePic)} alt="Profile" />
              ) : user.profilePic ? (
                <img src={`${user.profilePic}?${Date.now()}`} alt="Profile" />
              ) : (
                <div className="userprofile-placeholder-icon">
                  <FaCamera />
                </div>
              )}
              <input
                type="file"
                className="userprofile-file-input"
                onChange={handleProfilePicChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="userprofile-edit-form">
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="userprofile-edit-input"
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
                className="userprofile-edit-input"
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
                className="userprofile-edit-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="userprofile-edit-submit">
              Save Changes
            </button>
          </form>
        </div>
      ) : (
        <h1 className="userprofile-login-message">
          Please log in to access your account.
        </h1>
      )}
    </div>
  );
}

export default EditProfile;
