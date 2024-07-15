import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProtectedAuthRoute({ children }) {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user); 

  return auth ? (
    user.user.isAdmin ? (
      <Navigate to={"/admin-dashboard"} />
    ) : (
      <Navigate to={"/home"} />
    )
  ) : (
    children
  );
}

export default ProtectedAuthRoute;
