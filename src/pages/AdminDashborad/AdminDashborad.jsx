import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { removeUser } from "../../redux/slices/userSlice";
import axiosInstance from "../../axios/axiosInstance";
import "./AdminDashboard.css";
import { FaCamera } from "react-icons/fa"

function AdminDashborad() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/users");
        const filteredUsers = response.data.filter((user) => !user.isAdmin);
        setUsers(filteredUsers);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUsers();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    dispatch(removeUser());
    dispatch(logout());
    navigate("/");
  };

  const handleEdit = (userId) => {
    navigate(`/admin/edit-user/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      await axiosInstance.delete(`/admin/delete-user/${userId}`)
      setUsers(users.filter(user => user._id !== userId))
    } catch (error) {
      console.log(error.message)
    }
   
  }

  const handleAddUser = () => {
    navigate("/admin/create-user")
  }

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <button className="add-user-button" onClick={handleAddUser}>Add User</button>
      <div className="user-list">
        <h3>All Users</h3>
        {users.length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Profile Picture</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt="Profile"
                        width="50"
                        height="50"
                      />
                    ) : (
                      <FaCamera/>
                    )}
                  </td>
                  <td>
                    <button  onClick={() => handleEdit(user._id)}>Edit</button>
                    <button  onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashborad;
