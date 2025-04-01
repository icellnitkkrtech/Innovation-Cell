import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicAPI } from '../../services/api';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const AnnouncementsPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getAnnouncements();
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        toast.error('Failed to load announcements');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = announcements.filter(announcement => {
    if (filter === 'all') return true;
    return announcement.category === filter;
  });

  const isAdmin = isAuthenticated && user && user.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="mt-2 text-amber-100">Stay updated with the latest news and information</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                filter === 'all' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('general')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                filter === 'general' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setFilter('event')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                filter === 'event' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setFilter('academic')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                filter === 'academic' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Academic
            </button>
            <button
              onClick={() => setFilter('career')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                filter === 'career' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Career
            </button>
            <button
              onClick={() => setFilter('other')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                filter === 'other' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Other
            </button>
          </div>
          
          {isAdmin && (
            <Link
              to="/announcements/create"
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-500 whitespace-nowrap"
            >
              Create Announcement
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredAnnouncements.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-medium text-gray-300">No announcements found</h3>
            <p className="mt-2 text-gray-400">
              {filter !== 'all' 
                ? `There are no ${filter} announcements at the moment.` 
                : 'There are no announcements at the moment.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAnnouncements.map(announcement => (
              <Link 
                key={announcement._id} 
                to={`/announcements/${announcement._id}`}
                className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{announcement.title}</h3>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          announcement.category === 'general' ? 'bg-blue-600 text-white' :
                          announcement.category === 'event' ? 'bg-purple-600 text-white' :
                          announcement.category === 'academic' ? 'bg-green-600 text-white' :
                          announcement.category === 'career' ? 'bg-amber-600 text-white' :
                          'bg-gray-600 text-white'
                        }`}>
                          {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                        </span>
                        <span className="text-gray-400 text-sm ml-2">
                          {format(new Date(announcement.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-300 line-clamp-3">{announcement.content}</p>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <span className="text-amber-500 hover:text-amber-400">Read more →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage; 