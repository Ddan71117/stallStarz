import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('PublicRoute - User state:', user);
    console.log('PublicRoute - Loading state:', isLoading);
  }, [user, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (user) {
    console.log('PublicRoute - Redirecting to /search');
    return <Navigate to="/search" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;