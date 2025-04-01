import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Set the base URL for all axios requests
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
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
  const navigate = useNavigate();
  // Load user on initial render
  useEffect(() => {
    loadUser();
  }, []);

  // Load user from token
  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Load user error:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post('/api/auth/register', formData);
      
      // Don't automatically authenticate on register since email verification is required
      return res.data;
    } catch (error) {
      console.error('Register error:', error);
      if (error.response) {
        throw error.response.data;
      } else {
        throw new Error('Network error. Please try again.');
      }
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      const res = await axios.post('/api/auth/login', credentials);
      
      // Log the response to check if role is included
      console.log('Login response:', res.data);
      
      // Make sure the role is properly set
      if (!res.data.role) {
        console.error('Role missing in user data:', res.data);
        throw new Error('User role not specified');
      }
      
      setUser(res.data);
      setIsAuthenticated(true);
      
      return res.data;
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        throw error.response.data;
      } else if (error.request) {
        throw new Error('No response received from server. Please check your connection.');
      } else {
        throw new Error(error.message || 'Network error. Please try again.');
      }
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      await axios.post('/api/auth/logout');
      setUser(null);
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the server request fails, we should still clear the user state
      setUser(null);
      navigate('/login');
      toast.info('You have been logged out');
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const res = await axios.put('/api/users/profile', profileData);
      
      setUser(res.data);
      return res.data;
    } catch (error) {
      console.error('Update profile error:', error);
      if (error.response) {
        throw error.response.data;
      } else {
        throw new Error('Network error. Please try again.');
      }
    }
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Check if user is an admin
  const isAdmin = () => {
    return hasRole('admin');
  };

  // Check if user is a student
  const isStudent = () => {
    return hasRole('student');
  };

  // Check if user is an alumni
  const isAlumni = () => {
    return hasRole('alumni');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
        updateProfile,
        loadUser,
        hasRole,
        isAdmin,
        isStudent,
        isAlumni
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 