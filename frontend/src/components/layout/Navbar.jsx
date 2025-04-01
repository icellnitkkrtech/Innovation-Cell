import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin, isStudent, isAlumni } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Get the dashboard link based on user role
  const getDashboardLink = () => {
    if (isAdmin()) return '/admin/dashboard';
    if (isStudent()) return '/student/dashboard';
    return '/alumni/dashboard';
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-amber-500">
                AlumniConnect
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`${
                  isActive('/') 
                    ? 'border-amber-500 text-white' 
                    : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Home
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link
                    to={getDashboardLink()}
                    className={`${
                      isActive(getDashboardLink()) 
                        ? 'border-amber-500 text-white' 
                        : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Dashboard
                  </Link>
                  
                  <Link
                    to="/alumni-directory"
                    className={`${
                      isActive('/alumni-directory') 
                        ? 'border-amber-500 text-white' 
                        : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Alumni Directory
                  </Link>
                  
                  {/* Show Events link to all users */}
                  <Link
                    to="/events"
                    className={`${
                      isActive('/events') 
                        ? 'border-amber-500 text-white' 
                        : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Events
                  </Link>
                  
                  {/* Show Jobs link to all users */}
                  <Link
                    to="/jobs"
                    className={`${
                      isActive('/jobs') 
                        ? 'border-amber-500 text-white' 
                        : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Jobs
                  </Link>
                  
                  {/* Admin-specific links */}
                  {isAdmin() && (
                    <Link
                      to="/admin/users"
                      className={`${
                        isActive('/admin/users') 
                          ? 'border-amber-500 text-white' 
                          : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      Manage Users
                    </Link>
                  )}
                  
                  {/* Student-specific links */}
                  {isStudent() && (
                    <Link
                      to="/mentors"
                      className={`${
                        isActive('/mentors') 
                          ? 'border-amber-500 text-white' 
                          : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      Find Mentors
                    </Link>
                  )}
                  
                  {/* Alumni-specific links */}
                  {isAlumni() && (
                    <Link
                      to="/mentorship"
                      className={`${
                        isActive('/mentorship') 
                          ? 'border-amber-500 text-white' 
                          : 'border-transparent text-gray-300 hover:border-gray-300 hover:text-white'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      Mentorship
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="ml-3 relative flex items-center space-x-4">
                <Link
                  to="/profile"
                  className={`${
                    isActive('/profile') 
                      ? 'bg-gray-700' 
                      : 'hover:bg-gray-700'
                  } text-white px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Profile
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`${
              isActive('/') 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            Home
          </Link>
          
          {isAuthenticated && (
            <>
              <Link
                to={getDashboardLink()}
                className={`${
                  isActive(getDashboardLink()) 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                Dashboard
              </Link>
              
              <Link
                to="/alumni-directory"
                className={`${
                  isActive('/alumni-directory') 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                Alumni Directory
              </Link>
              
              <Link
                to="/events"
                className={`${
                  isActive('/events') 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                Events
              </Link>
              
              <Link
                to="/jobs"
                className={`${
                  isActive('/jobs') 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } block px-3 py-2 rounded-md text-base font-medium`}
              >
                Jobs
              </Link>
              
              {/* Role-specific mobile links */}
              {isAdmin() && (
                <Link
                  to="/admin/users"
                  className={`${
                    isActive('/admin/users') 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Manage Users
                </Link>
              )}
              
              {isStudent() && (
                <Link
                  to="/mentors"
                  className={`${
                    isActive('/mentors') 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Find Mentors
                </Link>
              )}
              
              {isAlumni() && (
                <Link
                  to="/mentorship"
                  className={`${
                    isActive('/mentorship') 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Mentorship
                </Link>
              )}
            </>
          )}
        </div>
        
        <div className="pt-4 pb-3 border-t border-gray-700">
          {isAuthenticated ? (
            <>
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-700">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150?text=Profile";
                        }}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-400">{user?.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Your Profile
                </Link>
                
                {isAdmin() && (
                  <Link
                    to="/admin/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Admin Settings
                  </Link>
                )}
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="mt-3 space-y-1 px-2">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;