import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalMentors: 0,
    upcomingEvents: [],
    recentJobs: [],
    recommendedAlumni: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // This would be replaced with actual API calls to your backend
        // const res = await axios.get('/api/student/dashboard');
        // setStats(res.data);
        
        // Simulated data for now
        setStats({
          totalMentors: 45,
          upcomingEvents: [
            { id: 1, title: 'Career Guidance Workshop', date: '2023-11-15', location: 'Main Auditorium' },
            { id: 2, title: 'Resume Building Session', date: '2023-11-22', location: 'Room 301' },
            { id: 3, title: 'Mock Interview Practice', date: '2023-12-05', location: 'Online' }
          ],
          recentJobs: [
            { id: 1, title: 'Summer Internship', company: 'Google', location: 'Bangalore', deadline: '2023-12-31' },
            { id: 2, title: 'Research Assistant', company: 'University Lab', location: 'Campus', deadline: '2023-11-30' },
            { id: 3, title: 'Part-time Developer', company: 'TechStart', location: 'Remote', deadline: '2023-12-15' }
          ],
          recommendedAlumni: [
            { id: 1, name: 'Rahul Sharma', position: 'Senior Software Engineer', company: 'Google', graduationYear: 2018, profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg' },
            { id: 2, name: 'Priya Patel', position: 'Product Manager', company: 'Amazon', graduationYear: 2019, profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg' },
            { id: 3, name: 'Amit Kumar', position: 'Data Scientist', company: 'Microsoft', graduationYear: 2020, profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg' }
          ]
        });
      } catch (error) {
        console.error('Error fetching student dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
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
          <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
          <p className="mt-2 text-xl text-gray-300">Welcome, {user?.name}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white">Available Mentors</h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.totalMentors}</p>
            <p className="text-white mt-2">Alumni ready to guide you</p>
            <Link to="/mentors" className="mt-4 inline-block px-4 py-2 bg-white text-indigo-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Find a Mentor
            </Link>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-500 to-teal-600 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.upcomingEvents.length}</p>
            <p className="text-white mt-2">Events to boost your career</p>
            <Link to="/events" className="mt-4 inline-block px-4 py-2 bg-white text-teal-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
              View Events
            </Link>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-white">Internships & Jobs</h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.recentJobs.length}</p>
            <p className="text-white mt-2">Opportunities waiting for you</p>
            <Link to="/jobs" className="mt-4 inline-block px-4 py-2 bg-white text-pink-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Browse Jobs
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-700 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
              <Link to="/events" className="text-amber-500 hover:text-amber-400">View All</Link>
            </div>
            <div className="p-6">
              {stats.upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {stats.upcomingEvents.map(event => (
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
                      <div className="mt-4">
                        <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                          Register
                        </button>
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
              <h2 className="text-xl font-bold text-white">Internship Opportunities</h2>
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
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          Deadline: {new Date(job.deadline).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                          Apply Now
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">No job opportunities available</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-700 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Recommended Alumni Mentors</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.recommendedAlumni.map(alumni => (
                  <motion.div
                    key={alumni.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-700 rounded-lg p-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-600 mb-4">
                        <img
                          src={alumni.profilePicture}
                          alt={alumni.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150?text=Alumni";
                          }}
                        />
                      </div>
                      <h3 className="text-lg font-medium text-white text-center">{alumni.name}</h3>
                      <p className="text-amber-500 text-center">{alumni.position}</p>
                      <p className="text-gray-400 text-center text-sm">{alumni.company}</p>
                      <p className="text-gray-400 text-center text-sm">Class of {alumni.graduationYear}</p>
                      <button className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                        Request Mentorship
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 