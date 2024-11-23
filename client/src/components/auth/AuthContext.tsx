import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verify token on mount and set user if valid
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      console.log('Checking token:', token ? 'Token exists' : 'No token');
      
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/api/auth/verify', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          const data = await response.json();
          console.log('Token verification response:', data);
          
          if (response.ok && data.user) {
            console.log('Setting user:', data.user);
            setUser(data.user);
          } else {
            console.log('Invalid token, clearing...');
            localStorage.removeItem('token');
            setUser(null);
          }
        } catch (error) {
          console.error('Token verification error:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return { success: true };
      }

      return { success: false, error: data.message };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error occurred' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};