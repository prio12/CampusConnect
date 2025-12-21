import { Navigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useUserStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg font-medium">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
