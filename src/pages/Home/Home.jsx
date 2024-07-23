import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { removeUser } from "../../redux/slices/userSlice";
import { FaCamera } from "react-icons/fa";

import "./Home.css";


function Home() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    dispatch(removeUser());
    dispatch(logout());
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/editprofile"); // Adjust the path as necessary
  };

  return (
    <div className="home-container">
      <div className="welcome-box">
        <h1>Welcome to the Home Page</h1>
        {user && (
          <>
            <div className="profile-image-wrapper">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <FaCamera className="camera-icon" />
              )}
            </div>
            <h2>Welcome, {user.username}!</h2>
            <button className="edit-button" onClick={handleEditProfile}>
              Edit Profile
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
