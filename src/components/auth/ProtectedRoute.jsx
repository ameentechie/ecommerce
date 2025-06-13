import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentToken } from '../../store/slices/userSlice';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  
  if (!user || !token) {
    // Redirect to login page but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectedRoute; 