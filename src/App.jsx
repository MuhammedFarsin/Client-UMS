import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProfile from "./pages/EditProfile/EditProfile.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import AdminDashboard from "./pages/AdminDashborad/AdminDashborad.jsx";
import ProtectedAuthRoute from "./routes/ProtectedAuthRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import AdminEditProfile from "./pages/AdminEditProfile/AdminEditProfile.jsx";
import AdminCreateUser from "./pages/AdminCreateUser/AdminCreateUser.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedAuthRoute>
              <Login />
            </ProtectedAuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedAuthRoute>
              <SignUp />
            </ProtectedAuthRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editprofile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-user/:userId"
          element={
            <ProtectedRoute>
              <AdminEditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/delete-user/:userId"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-user"
          element={
            <ProtectedRoute>
              <AdminCreateUser />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
