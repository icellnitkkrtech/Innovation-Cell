import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { publicAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AnnouncementDetailsPage = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getAnnouncementById(id);
        setAnnouncement(response.data);
      } catch (error) {
        console.error('Error fetching announcement:', error);
        toast.error(error.response?.data?.msg || 'Failed to fetch announcement');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!announcement) {
    return <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">Announcement not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Announcement Details</h1>
          <p className="mt-2 text-amber-100">View the details of the announcement</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Announcement Details</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <p className="text-gray-300">{announcement.title}</p>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Category</label>
                <p className="text-gray-300">{announcement.category}</p>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <p className="text-gray-300">{announcement.description}</p>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Date</label>
                <p className="text-gray-300">{new Date(announcement.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        
        {announcement.category === 'event' && (
          <div className="mt-6 bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Related Events</h2>
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Check out our upcoming events</p>
              <Link 
                to="/events" 
                className="text-amber-500 hover:text-amber-400"
              >
                View All Events →
              </Link>
            </div>
          </div>
        )}
        
        {announcement.category === 'career' && (
          <div className="mt-6 bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Job Opportunities</h2>
            <div className="flex items-center justify-between">
              <p className="text-gray-300">Browse available job opportunities</p>
              <Link 
                to="/jobs" 
                className="text-amber-500 hover:text-amber-400"
              >
                View All Jobs →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementDetailsPage; 