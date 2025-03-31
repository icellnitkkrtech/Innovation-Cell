import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAlumni: 0,
    totalStudents: 0,
    recentEvents: [],
    recentJobs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // This would be replaced with actual API calls to your backend
        // const res = await axios.get('/api/dashboard/stats');
        // setStats(res.data);
        
        // Simulated data for now
        setStats({
          totalAlumni: 1250,
          totalStudents: 3500,
          recentEvents: [
            { id: 1, title: 'Annual Alumni Meet', date: '2023-12-15', location: 'Main Campus' },
            { id: 2, title: 'Career Fair', date: '2023-11-05', location: 'Engineering Block' },
            { id: 3, title: 'Industry Expert Talk', date: '2023-10-22', location: 'Virtual' }
          ],
          recentJobs: [
            { id: 1, title: 'Software Engineer', company: 'Google', location: 'Bangalore', postedBy: 'Rahul Sharma' },
            { id: 2, title: 'Product Manager', company: 'Amazon', location: 'Hyderabad', postedBy: 'Priya Patel' },
            { id: 3, title: 'Data Scientist', company: 'Microsoft', location: 'Pune', postedBy: 'Amit Kumar' }
          ]
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
          <h1 className="text-3xl font-bold text-white">Welcome, {user?.name}!</h1>
          <p className="mt-2 text-xl text-gray-300">Stay connected with your alumni network</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white">Alumni</h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.totalAlumni}</p>
            <p className="text-white mt-2">Registered alumni in our network</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white">Students</h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.totalStudents}</p>
            <p className="text-white mt-2">Current students in our community</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-500 to-teal-600 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white">Events</h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.recentEvents.length}</p>
            <p className="text-white mt-2">Upcoming events this month</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white">Job Postings</h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.recentJobs.length}</p>
            <p className="text-white mt-2">New job opportunities</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-700 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
              <Link to="/events" className="text-amber-500 hover:text-amber-400">View All</Link>
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
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No upcoming events</p>
              )}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-700 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Recent Job Postings</h2>
              <Link to="/jobs" className="text-amber-500 hover:text-amber-400">View All</Link>
            </div>
            <div className="p-6">
              {stats.recentJobs.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentJobs.map(job => (
                    <motion.div 
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-700 rounded-lg p-4"
                    >
                      <h3 className="text-lg font-medium text-white">{job.title}</h3>
                      <p className="text-amber-500">{job.company}</p>
                      <div className="mt-2 flex justify-between text-sm text-gray-300">
                        <div className="flex items-center">
                          <svg className="h-4 w-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <svg className="h-4 w-4 mr-1 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          Posted by: {job.postedBy}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No recent job postings</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 