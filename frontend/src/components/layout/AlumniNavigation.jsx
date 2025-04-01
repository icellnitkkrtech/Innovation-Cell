import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AlumniNavigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 z-20 px-4 py-2 flex justify-between items-center border-b border-gray-800">
        <Link to="/alumni" className="text-xl font-bold text-white">Alumni Portal</Link>
        <button
          onClick={toggleMobileMenu}
          className="text-gray-400 hover:text-white focus:outline-none"
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>
      </div>

      {/* Sidebar navigation */}
      <div className={`fixed inset-y-0 left-0 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 bg-gray-800 overflow-y-auto transition duration-200 ease-in-out z-10`}>
        <div className="p-6">
          <Link to="/alumni" className="text-xl font-bold text-white block mb-6">Alumni Portal</Link>
          
          {user && (
            <div className="mb-6 pb-6 border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <i className="fas fa-user text-gray-500"></i>
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-gray-400 text-sm">Class of {user.graduationYear || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
          
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/alumni"
                  className={`block px-4 py-2 rounded-md ${location.pathname === '/alumni' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                >
                  <i className="fas fa-tachometer-alt mr-3"></i>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/alumni/directory"
                  className={`block px-4 py-2 rounded-md ${location.pathname === '/alumni/directory' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                >
                  <i className="fas fa-users mr-3"></i>
                  Alumni Directory
                </Link>
              </li>
              <li>
                <Link
                  to="/alumni/events"
                  className={`block px-4 py-2 rounded-md ${location.pathname === '/alumni/events' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                >
                  <i className="fas fa-calendar-alt mr-3"></i>
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/alumni/jobs"
                  className={`block px-4 py-2 rounded-md ${location.pathname === '/alumni/jobs' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                >
                  <i className="fas fa-briefcase mr-3"></i>
                  Job Opportunities
                </Link>
              </li>
              <li>
                <Link
                  to="/alumni/mentorship"
                  className={`block px-4 py-2 rounded-md ${location.pathname === '/alumni/mentorship' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                >
                  <i className="fas fa-hands-helping mr-3"></i>
                  Mentorship
                </Link>
              </li>
              <li>
                <Link
                  to="/alumni/projects"
                  className={`block px-4 py-2 rounded-md ${location.pathname === '/alumni/projects' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                >
                  <i className="fas fa-project-diagram mr-3"></i>
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/alumni/donations"
                  className={`block px-4 py-2 rounded-md ${location.pathname === '/alumni/donations' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                >
                  <i className="fas fa-hand-holding-usd mr-3"></i>
                  Donations
                </Link>
              </li>
              <li>
                <Link
                  to="/alumni/resources"
                  className={`block px-4 py-2 rounded-md ${location.pathname === '/alumni/resources' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                >
                  <i className="fas fa-book mr-3"></i>
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/alumni/forums"
                  className={`block px-4 py-2 rounded-md ${location.pathname === '/alumni/forums' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                >
                  <i className="fas fa-comments mr-3"></i>
                  Forums
                </Link>
              </li>
              <li>
                <Link
                  to="/alumni/profile"
                  className={`block px-4 py-2 rounded-md ${location.pathname === '/alumni/profile' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                >
                  <i className="fas fa-user-circle mr-3"></i>
                  My Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="w-full text-left block px-4 py-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <i className="fas fa-sign-out-alt mr-3"></i>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AlumniNavigation; 