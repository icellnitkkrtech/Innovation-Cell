import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminAPI } from '../../services/api';

const UserManagement = ({ recentUsers = null }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(recentUsers === null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    isVerified: false
  });

  useEffect(() => {
    if (recentUsers) {
      setUsers(recentUsers);
      setLoading(false);
    } else {
      fetchUsers();
    }
  }, [recentUsers]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getAllUsers();
      console.log('Fetched users:', res.data);
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async (userId) => {
    try {
      await adminAPI.verifyUser(userId);
      
      // Update local state
      setUsers(users.map(user => 
        user._id === userId 
          ? { ...user, isVerified: true } 
          : user
      ));
      
      toast.success('User verified successfully');
    } catch (error) {
      console.error('Error verifying user:', error);
      toast.error('Failed to verify user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.deleteUser(userId);
        
        // Update local state
        setUsers(users.filter(user => user._id !== userId));
        
        toast.success('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role || 'student',
      isVerified: user.isVerified || false
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await adminAPI.updateUser(selectedUser._id, formData);
      
      // Update local state
      setUsers(users.map(user => 
        user._id === selectedUser._id 
          ? { ...user, ...formData } 
          : user
      ));
      
      setShowEditModal(false);
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    }
  };

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="bg-gray-700 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">{recentUsers ? 'Recent Users' : 'All Users'}</h2>
        {!recentUsers && (
          <button
            onClick={() => fetchUsers()}
            className="text-amber-500 hover:text-amber-400"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}
      </div>
      
      {!recentUsers && (
        <div className="bg-gray-700 px-6 py-3 border-t border-gray-600 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border-gray-600 bg-gray-600 text-white focus:ring-amber-500 focus:border-amber-500 pl-10"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="w-full md:w-48">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full rounded-md border-gray-600 bg-gray-600 text-white focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="alumni">Alumni</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      )}
      
      <div className="p-6">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-white">No users found</h3>
            <p className="mt-1 text-gray-400">No users match your current filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user._id} className="bg-gray-700 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-medium">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{user.name}</h3>
                    <p className="text-gray-400">{user.email}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-red-900 text-red-200' 
                          : user.role === 'alumni' 
                            ? 'bg-amber-900 text-amber-200'
                            : 'bg-blue-900 text-blue-200'
                      }`}>
                        {user.role || 'student'}
                      </span>
                      {user.isVerified ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-900 text-green-200">Verified</span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-600 text-gray-300">Unverified</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 w-full md:w-auto">
                  {!user.isVerified && (
                    <button
                      onClick={() => handleVerifyUser(user._id)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
                    >
                      Verify
                    </button>
                  )}
                  <button
                    onClick={() => handleEditUser(user)}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-white">
                        Edit User
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-gray-400">
                            Role
                          </label>
                          <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          >
                            <option value="student">Student</option>
                            <option value="alumni">Alumni</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="isVerified"
                            name="isVerified"
                            type="checkbox"
                            checked={formData.isVerified}
                            onChange={handleChange}
                            className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded"
                          />
                          <label htmlFor="isVerified" className="ml-2 block text-sm text-white">
                            Verified
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-base font-medium text-white hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UserManagement; 