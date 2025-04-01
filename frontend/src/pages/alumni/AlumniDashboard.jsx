import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { alumniAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AlumniDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    recentAnnouncements: [],
    upcomingEvents: [],
    jobOpportunities: [],
    networkingOpportunities: [],
    alumniSpotlight: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await alumniAPI.getDashboardData();
      
      // Ensure all array properties exist before setting state
      setDashboardData({
        recentAnnouncements: data.recentAnnouncements || [],
        upcomingEvents: data.upcomingEvents || [],
        jobOpportunities: data.jobOpportunities || [],
        networkingOpportunities: data.networkingOpportunities || [],
        alumniSpotlight: data.alumniSpotlight || null
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
      
      // Set default empty values on error
      setDashboardData({
        recentAnnouncements: [],
        upcomingEvents: [],
        jobOpportunities: [],
        networkingOpportunities: [],
        alumniSpotlight: null
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Alumni Dashboard</h1>
          <p className="text-xl text-gray-400">Welcome back! Here's your activity overview.</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="col-span-2">
              <div className="bg-gray-750 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">Upcoming Events</h3>
                  <Link to="/events" className="text-amber-500 hover:text-amber-400 text-sm">
                    View All
                  </Link>
                </div>
                
                {dashboardData.upcomingEvents.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No upcoming events
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.upcomingEvents.slice(0, 3).map(event => (
                      <div 
                        key={event._id}
                        className="bg-gray-750 rounded-lg p-4"
                      >
                        <div className="flex justify-between">
                          <h3 className="font-medium">{event.title}</h3>
                          <span className="text-gray-400 text-sm">
                            {format(new Date(event.date), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-2">
                          {event.description.substring(0, 150)}
                          {event.description.length > 150 ? '...' : ''}
                        </p>
                        <div className="mt-3 flex justify-end">
                          <Link 
                            to={`/events/${event._id}`}
                            className="text-amber-500 hover:text-amber-400 text-sm"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-2">
              <div className="bg-gray-750 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">Recent Announcements</h3>
                  <Link to="/announcements" className="text-amber-500 hover:text-amber-400 text-sm">
                    View All
                  </Link>
                </div>
                
                {dashboardData.recentAnnouncements.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No recent announcements
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.recentAnnouncements.slice(0, 3).map(announcement => (
                      <div 
                        key={announcement._id}
                        className="bg-gray-750 rounded-lg p-4"
                      >
                        <div className="flex justify-between">
                          <h3 className="font-medium">{announcement.title}</h3>
                          <span className="text-gray-400 text-sm">
                            {format(new Date(announcement.createdAt), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-2">
                          {announcement.content.substring(0, 150)}
                          {announcement.content.length > 150 ? '...' : ''}
                        </p>
                        <div className="mt-3 flex justify-end">
                          <Link 
                            to={`/announcements/${announcement._id}`}
                            className="text-amber-500 hover:text-amber-400 text-sm"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-2">
              <div className="bg-gray-750 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">Job Opportunities</h3>
                  <Link to="/jobs" className="text-amber-500 hover:text-amber-400 text-sm">
                    View All
                  </Link>
                </div>
                
                {dashboardData.jobOpportunities.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No job opportunities
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.jobOpportunities.slice(0, 3).map(job => (
                      <div 
                        key={job._id}
                        className="bg-gray-750 rounded-lg p-4"
                      >
                        <div className="flex justify-between">
                          <h3 className="font-medium">{job.title}</h3>
                          <span className="text-gray-400 text-sm">
                            {format(new Date(job.createdAt), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-2">
                          {job.description.substring(0, 150)}
                          {job.description.length > 150 ? '...' : ''}
                        </p>
                        <div className="mt-3 flex justify-end">
                          <Link 
                            to={`/jobs/${job._id}`}
                            className="text-amber-500 hover:text-amber-400 text-sm"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-2">
              <div className="bg-gray-750 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">Networking Opportunities</h3>
                  <Link to="/networking" className="text-amber-500 hover:text-amber-400 text-sm">
                    View All
                  </Link>
                </div>
                
                {dashboardData.networkingOpportunities.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    No networking opportunities
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dashboardData.networkingOpportunities.slice(0, 3).map(opportunity => (
                      <div 
                        key={opportunity._id}
                        className="bg-gray-750 rounded-lg p-4"
                      >
                        <div className="flex justify-between">
                          <h3 className="font-medium">{opportunity.title}</h3>
                          <span className="text-gray-400 text-sm">
                            {format(new Date(opportunity.createdAt), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-2">
                          {opportunity.description.substring(0, 150)}
                          {opportunity.description.length > 150 ? '...' : ''}
                        </p>
                        <div className="mt-3 flex justify-end">
                          <Link 
                            to={`/networking/${opportunity._id}`}
                            className="text-amber-500 hover:text-amber-400 text-sm"
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-2">
              <div className="bg-gray-750 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">Alumni Spotlight</h3>
                  <Link to="/alumni/spotlight" className="text-amber-500 hover:text-amber-400 text-sm">
                    View All
                  </Link>
                </div>
                
                {dashboardData.alumniSpotlight ? (
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="md:w-1/3">
                      <div className="bg-gray-750 rounded-lg p-4">
                        <div className="flex items-center">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                            {dashboardData.alumniSpotlight.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <h2 className="text-xl font-bold text-white">{dashboardData.alumniSpotlight.name}</h2>
                            <p className="text-amber-500">{dashboardData.alumniSpotlight.jobTitle}</p>
                            <p className="text-gray-400 text-sm">{dashboardData.alumniSpotlight.company}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h3 className="font-medium text-white">About</h3>
                          <p className="text-gray-400 mt-1">{dashboardData.alumniSpotlight.bio}</p>
                        </div>
                        
                        <div className="mt-4">
                          <h3 className="font-medium text-white">Expertise</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {dashboardData.alumniSpotlight.expertise.map((skill, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-gray-700 rounded-full text-xs text-white"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h3 className="font-medium text-white">Availability</h3>
                          <p className="text-gray-400 mt-1">{dashboardData.alumniSpotlight.availability}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    No alumni spotlight available
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Quick Access Navigation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Link to="/alumni/directory" className="bg-gray-800 hover:bg-gray-750 rounded-lg p-6 transition-colors flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mb-4">
                <i className="fas fa-users text-blue-300 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium mb-2">Alumni Directory</h3>
              <p className="text-gray-400 text-sm">Connect with fellow alumni from your program</p>
            </Link>
            
            <Link to="/alumni/events" className="bg-gray-800 hover:bg-gray-750 rounded-lg p-6 transition-colors flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-900 flex items-center justify-center mb-4">
                <i className="fas fa-calendar-alt text-green-300 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium mb-2">Events</h3>
              <p className="text-gray-400 text-sm">Discover and register for upcoming alumni events</p>
            </Link>
            
            <Link to="/alumni/jobs" className="bg-gray-800 hover:bg-gray-750 rounded-lg p-6 transition-colors flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-amber-900 flex items-center justify-center mb-4">
                <i className="fas fa-briefcase text-amber-300 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium mb-2">Job Opportunities</h3>
              <p className="text-gray-400 text-sm">Browse and apply for jobs shared by alumni</p>
            </Link>
            
            <Link to="/alumni/mentorship" className="bg-gray-800 hover:bg-gray-750 rounded-lg p-6 transition-colors flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center mb-4">
                <i className="fas fa-hands-helping text-purple-300 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium mb-2">Mentorship</h3>
              <p className="text-gray-400 text-sm">Connect with mentors or become a mentor</p>
            </Link>
            
            <Link to="/alumni/projects" className="bg-gray-800 hover:bg-gray-750 rounded-lg p-6 transition-colors flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-900 flex items-center justify-center mb-4">
                <i className="fas fa-project-diagram text-indigo-300 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium mb-2">Projects</h3>
              <p className="text-gray-400 text-sm">Collaborate on alumni-led projects</p>
            </Link>
            
            <Link to="/alumni/donations" className="bg-gray-800 hover:bg-gray-750 rounded-lg p-6 transition-colors flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-900 flex items-center justify-center mb-4">
                <i className="fas fa-hand-holding-usd text-red-300 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium mb-2">Donations</h3>
              <p className="text-gray-400 text-sm">Support your alma mater through donations</p>
            </Link>
            
            <Link to="/alumni/resources" className="bg-gray-800 hover:bg-gray-750 rounded-lg p-6 transition-colors flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-teal-900 flex items-center justify-center mb-4">
                <i className="fas fa-book text-teal-300 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium mb-2">Resources</h3>
              <p className="text-gray-400 text-sm">Access alumni resources and materials</p>
            </Link>
            
            <Link to="/alumni/forums" className="bg-gray-800 hover:bg-gray-750 rounded-lg p-6 transition-colors flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-pink-900 flex items-center justify-center mb-4">
                <i className="fas fa-comments text-pink-300 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium mb-2">Forums</h3>
              <p className="text-gray-400 text-sm">Participate in discussions with other alumni</p>
            </Link>
          </div>
        </div>
        
        {/* Profile Link */}
        <div className="mt-12 bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Complete Your Alumni Profile</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Update your profile to connect with more alumni, receive personalized opportunities, 
            and make the most of your alumni network.
          </p>
          <Link 
            to="/alumni/profile" 
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors inline-block"
          >
            <i className="fas fa-user-circle mr-2"></i>
            View My Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard; 