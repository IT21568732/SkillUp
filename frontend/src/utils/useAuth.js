import { useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Assuming you're using jwt-decode for decoding JWT tokens

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const isRegisterRoute = location.pathname === '/register';

    if (!token && !isRegisterRoute) {
      // No token found, redirect to login page
      navigate('/'); // Change this to your login route
      return;
    }

    if (token) {
        try {
          // Verify the token
          const decodedToken = jwtDecode(token);
  
          // Check if token is expired
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            localStorage.removeItem('authToken');
            navigate('/'); // Redirect to login page if token is expired
          }
        } catch (error) {
          // Token is invalid, redirect to login page
          localStorage.removeItem('authToken');
          navigate('/'); // Redirect to login page
        }
      }
    }, [navigate, location.pathname]);

  return null; // This hook doesn't return any UI elements
};

export default useAuth;