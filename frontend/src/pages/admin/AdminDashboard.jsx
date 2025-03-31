import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAlumni: 0,
    totalStudents: 0,
    pendingVerifications: 0,
    recentUsers: [],
    recentEvents: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // This would be replaced with actual API calls to your backend
        // const res = await axios.get('/api/admin/dashboard');
        // setStats(res.data);
        
        // Simulated data for now
        setStats({
          totalUsers: 4750,
          totalAlumni: 1250,
          totalStudents: 3500,
          pendingVerifications: 15,
          recentUsers: [
            { id: 1, name: 'Rahul Sharma', email: 'rahul.sharma@example.com', role: 'alumni', createdAt: '2023-10-25T10:30:00Z', isVerified: true },
            { id: 2, name: 'Priya Patel', email: 'priya.patel@example.com', role: 'alumni', createdAt: '2023-10-26T14:45:00Z', isVerified: true },
            { id: 3, name: 'Amit Kumar', email: 'amit.kumar@example.com', role: 'student', createdAt: '2023-10-27T09:15:00Z', isVerified: false },
            { id: 4, name: 'Neha Singh', email: 'neha.singh@example.com', role: 'student', createdAt: '2023-10-28T16:20:00Z', isVerified: false },
            { id: 5, name: 'Vikram Reddy', email: 'vikram.reddy@example.com', role: 'alumni', createdAt: '2023-10-29T11:10:00Z', isVerified: true }
          ],
          recentEvents: [
            { id: 1, title: 'Annual Alumni Meet', date: '2023-12-15', location: 'Main Campus', attendees: 120 },
            { id: 2, title: 'Career Fair', date: '2023-11-05', location: 'Engineering Block', attendees: 350 },
            { id: 3, title: 'Industry Expert Talk', date: '2023-10-22', location: 'Virtual', attendees: 275 }
          ]
        });
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleVerifyUser = async (userId) => {
    try {
      // This would be replaced with actual API call
      // await axios.post(`/api/admin/verify-user/${userId}`);
      
      // Update local state to reflect the change
      setStats(prevStats => ({
        ...prevStats,
        pendingVerifications: prevStats.pendingVerifications - 1,
        recentUsers: prevStats.recentUsers.map(user => 
          user.id === userId ? { ...user, isVerified: true } : user
        )
      }));
      
      toast.success('User verified successfully');
    } catch (error) {
      console.error('Error verifying user:', error);
      toast.error('Failed to verify user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        // This would be replaced with actual API call
        // await axios.delete(`/api/admin/users/${userId}`);
        
        // Update local state to reflect the change
        setStats(prevStats => ({
          ...prevStats,
          totalUsers: prevStats.totalUsers - 1,
          recentUsers: prevStats.recentUsers.filter(user => user.id !== userId)
        }));
        
        toast.success('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-xl text-gray-300">Welcome, {user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white">Total Users</h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.totalUsers}</p>
            <p className="text-white mt-2">Registered users</p>
            <Link to="/admin/users" className="mt-4 inline-block px-4 py-2 bg-white text-indigo-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Manage Users
            </Link>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white">Alumni</h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.totalAlumni}</p>
            <p className="text-white mt-2">Registered alumni</p>
            <Link to="/admin/alumni" className="mt-4 inline-block px-4 py-2 bg-white text-orange-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
              View Alumni
            </Link>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-500 to-teal-600 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white">Students</h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.totalStudents}</p>
            <p className="text-white mt-2">Current students</p>
            <Link to="/admin/students" className="mt-4 inline-block px-4 py-2 bg-white text-teal-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
              View Students
            </Link>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-red-500 to-pink-600 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white">Pending Verifications</h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.pendingVerifications}</p>
            <p className="text-white mt-2">Users awaiting verification</p>
            <Link to="/admin/verifications" className="mt-4 inline-block px-4 py-2 bg-white text-pink-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Verify Users
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-700 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Recent Users</h2>
              <Link to="/admin/users" className="text-amber-500 hover:text-amber-400">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Joined
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {stats.recentUsers.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-white">
                            {user.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : user.role === 'alumni' 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isVerified 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isVerified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {!user.isVerified && (
                            <button 
                              onClick={() => handleVerifyUser(user.id)}
                              className="text-green-400 hover:text-green-300"
                            >
                              Verify
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-700 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Recent Events</h2>
              <Link to="/admin/events" className="text-amber-500 hover:text-amber-400">Manage Events</Link>
            </div>
            <div className="p-6">
              {stats.recentEvents.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentEvents.map(event => (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-700 rounded-lg p-4"
                    >
                      <h3 className="text-lg font-medium text-white">{event.title}</h3>
                      <div className="mt-2 flex justify-between text-sm text-gray-300">
                        <div className="flex items-center">
                          <svg className="h-4 w-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <svg className="h-4 w-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {event.location}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-300">
                        <svg className="h-4 w-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {event.attendees} Attendees
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                          Edit
                        </button>
                        <button className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No events found</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-700 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/admin/create-event">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="h-12 w-12 text-amber-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-white">Create Event</h3>
                    <p className="mt-1 text-sm text-gray-300">Schedule a new event for alumni and students</p>
                  </motion.div>
                </Link>

                <Link to="/admin/create-job">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="h-12 w-12 text-amber-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-white">Post Job</h3>
                    <p className="mt-1 text-sm text-gray-300">Add a new job or internship opportunity</p>
                  </motion.div>
                </Link>

                <Link to="/admin/send-announcement">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="h-12 w-12 text-amber-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-white">Send Announcement</h3>
                    <p className="mt-1 text-sm text-gray-300">Broadcast a message to all users</p>
                  </motion.div>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Link to="/admin/reports">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="h-12 w-12 text-amber-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-white">Analytics</h3>
                    <p className="mt-1 text-sm text-gray-300">View detailed reports and statistics</p>
                  </motion.div>
                </Link>

                <Link to="/admin/settings">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="h-12 w-12 text-amber-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-white">Settings</h3>
                    <p className="mt-1 text-sm text-gray-300">Configure platform settings</p>
                  </motion.div>
                </Link>

                <Link to="/admin/backup">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600 transition-colors"
                  >
                    <svg className="h-12 w-12 text-amber-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-white">Backup Data</h3>
                    <p className="mt-1 text-sm text-gray-300">Export and backup platform data</p>
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;