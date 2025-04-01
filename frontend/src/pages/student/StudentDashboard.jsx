import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../services/api';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    upcomingEvents: [],
    recentAnnouncements: [],
    jobOpportunities: [],
    mentorshipRequests: [],
    membership: null
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Use Promise.allSettled instead of Promise.all to handle partial failures
        const results = await Promise.allSettled([
          userAPI.getUpcomingEvents(),
          userAPI.getRecentAnnouncements(),
          userAPI.getJobOpportunities(),
          userAPI.getMentorshipRequests(),
          userAPI.getMembership()
        ]);
        
        // Process results, using empty arrays for any rejected promises
        const [eventsResult, announcementsResult, jobsResult, mentorshipResult, membershipResult] = results;
        
        setStats({
          upcomingEvents: eventsResult.status === 'fulfilled' ? eventsResult.value.data : [],
          recentAnnouncements: announcementsResult.status === 'fulfilled' ? announcementsResult.value.data : [],
          jobOpportunities: jobsResult.status === 'fulfilled' ? jobsResult.value.data : [],
          mentorshipRequests: mentorshipResult.status === 'fulfilled' ? mentorshipResult.value.data : [],
          membership: membershipResult.status === 'fulfilled' ? membershipResult.value.data : null
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load some dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };
  
  const handleFindMentorClick = () => {
    navigate('/mentorship/find');
  };

  // Add this function to check if current month payment is done
  const isCurrentMonthPaid = () => {
    if (!stats.membership) return false;
    
    const currentMonth = new Date().getMonth().toString();
    const currentYear = new Date().getFullYear();
    
    return stats.membership.monthlyPayments.some(
      payment => 
        payment.month === currentMonth && 
        payment.year === currentYear &&
        payment.status === 'paid'
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Welcome, {user?.name || 'Student'}</h1>
          <p className="mt-2 text-amber-100">Your student dashboard at a glance</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Profile Summary */}
            <div className="bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0) || 'S'}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{user?.name || 'Student'}</h2>
                  <p className="text-gray-400">{user?.email || 'student@example.com'}</p>
                  <p className="text-amber-500 mt-1">Student</p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium">Program</h3>
                  <p className="text-gray-400 mt-1">{user?.program || 'Not specified'}</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium">Year</h3>
                  <p className="text-gray-400 mt-1">{user?.year || 'Not specified'}</p>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-4">
                <Link 
                  to="/profile"
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-center transition"
                >
                  Edit Profile
                </Link>
                <button 
                  onClick={handleFindMentorClick}
                  className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-2 px-4 rounded-md text-center transition"
                >
                  Find a Mentor
                </button>
              </div>

              {/* Add Membership Status */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Membership Status</h3>
                <div className={`p-4 rounded-lg ${isCurrentMonthPaid() ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Monthly Contribution</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {isCurrentMonthPaid() 
                          ? 'Your payment for this month is complete.' 
                          : 'Your monthly contribution is due.'}
                      </p>
                    </div>
                    <div>
                      <Link 
                        to="/membership"
                        className={`px-4 py-2 rounded-md text-sm ${
                          isCurrentMonthPaid() 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-amber-600 hover:bg-amber-500 text-white'
                        }`}
                      >
                        {isCurrentMonthPaid() ? 'View Details' : 'Pay Now'}
                      </Link>
                    </div>
                  </div>
                  {stats.membership && (
                    <div className="mt-2 text-sm">
                      <p>
                        Total paid: <span className="text-green-400">₹{stats.membership.totalPaid}</span>
                      </p>
                      {stats.membership.totalDue > 0 && (
                        <p>
                          Amount due: <span className="text-red-400">₹{stats.membership.totalDue}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Upcoming Events</h2>
                <Link to="/events" className="text-amber-500 hover:text-amber-400 text-sm">
                  View All
                </Link>
              </div>
              
              {stats.upcomingEvents.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No upcoming events
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.upcomingEvents.slice(0, 3).map(event => (
                    <div 
                      key={event._id}
                      onClick={() => handleEventClick(event._id)}
                      className="bg-gray-750 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{event.title}</h3>
                        <span className="text-amber-500 text-sm">
                          {format(new Date(event.date), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        {event.location}
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-400">
                        <span className="flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {format(new Date(event.date), 'h:mm a')}
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          {event.attendees?.length || 0} attending
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Job Opportunities */}
            <div className="bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Job Opportunities</h2>
                <Link to="/jobs" className="text-amber-500 hover:text-amber-400 text-sm">
                  View All
                </Link>
              </div>
              
              {stats.jobOpportunities.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No job opportunities available
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.jobOpportunities.slice(0, 3).map(job => (
                    <Link 
                      key={job._id}
                      to={`/jobs/${job._id}`}
                      className="block bg-gray-750 rounded-lg p-4 hover:bg-gray-700 transition"
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{job.title}</h3>
                        <span className="text-amber-500 text-sm">
                          {job.type.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        {job.company} • {job.location}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300">
                            +{job.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mentorship Requests */}
            <div className="bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Mentorship Requests</h2>
                <Link to="/mentorship" className="text-amber-500 hover:text-amber-400 text-sm">
                  View All
                </Link>
              </div>
              
              {stats.mentorshipRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No mentorship requests
                  <div className="mt-4">
                    <button
                      onClick={handleFindMentorClick}
                      className="bg-amber-600 hover:bg-amber-500 text-white py-2 px-4 rounded-md text-center transition"
                    >
                      Find a Mentor
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.mentorshipRequests.slice(0, 3).map(request => (
                    <div 
                      key={request._id}
                      className="bg-gray-750 rounded-lg p-4"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                          {request.mentor.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium">{request.mentor.name}</h3>
                          <p className="text-gray-400 text-sm">{request.mentor.jobTitle} at {request.mentor.company}</p>
                        </div>
                        <div className="ml-auto">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            request.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                            request.status === 'accepted' ? 'bg-green-900 text-green-300' :
                            'bg-red-900 text-red-300'
                          }`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mt-2">
                        {request.message.substring(0, 100)}
                        {request.message.length > 100 ? '...' : ''}
                      </p>
                      <div className="mt-3 flex justify-end">
                        <Link 
                          to={`/mentorship/requests/${request._id}`}
                          className="text-amber-500 hover:text-amber-400 text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Announcements */}
            <div className="bg-gray-800 rounded-lg shadow p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Announcements</h2>
                <Link to="/announcements" className="text-amber-500 hover:text-amber-400 text-sm">
                  View All
                </Link>
              </div>
              
              {stats.recentAnnouncements.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No recent announcements
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentAnnouncements.slice(0, 3).map(announcement => (
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
        )}
      </div>
    </div>
  );
};

export default StudentDashboard; 