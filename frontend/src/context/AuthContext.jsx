import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Set the base URL and credentials for all axios requests
axios.defaults.baseURL = 'http://localhost:3002';
axios.defaults.withCredentials = true;

// Create the context
const AuthContext = createContext();

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Check if there's a token in localStorage
        const token = localStorage.getItem('token');
        
        if (token) {
          // Set the authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Fetch user data
          const res = await axios.get('/api/auth/me');
          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // If there's an error, clear the token
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email });
      const res = await axios.post('/api/auth/login', { email, password });
      console.log('Login response:', res.data);
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      
      // Set the authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      // Set user data
      setUser(res.data.user);
      setIsAuthenticated(true);
      
      return res.data;
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Throw the error data so it can be caught by the component
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error('Network error. Please try again.');
      }
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      
      // Don't automatically log in after registration since email verification is required
      return res.data;
    } catch (error) {
      console.error('Registration error in context:', error.response?.data || error.message);
      
      // Throw the error data so it can be caught by the component
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error('Network error. Please try again.');
      }
    }
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear user data
    setUser(null);
    setIsAuthenticated(false);
  };

  // Update profile function
  const updateProfile = async (userData) => {
    try {
      const res = await axios.put('/api/auth/update-profile', userData);
      setUser(res.data);
      return res.data;
    } catch (error) {
      console.error('Profile update error:', error.response?.data || error.message);
      
      if (error.response && error.response.data) {
        throw error.response.data;
      } else {
        throw new Error('Network error. Please try again.');
      }
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated,
      login, 
      register, 
      logout, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}; 