import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/admin/AdminLayout';

const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    isImportant: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllAnnouncements();
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast.error('Failed to load announcements');
    } finally {
      setLoading(false);
    }
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
      if (isEditing) {
        await adminAPI.updateAnnouncement(currentId, formData);
        toast.success('Announcement updated successfully');
      } else {
        await adminAPI.createAnnouncement(formData);
        toast.success('Announcement created successfully');
      }
      
      resetForm();
      fetchAnnouncements();
    } catch (error) {
      console.error('Error saving announcement:', error);
      toast.error(error.response?.data?.msg || 'Failed to save announcement');
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      isImportant: announcement.isImportant
    });
    setIsEditing(true);
    setCurrentId(announcement._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await adminAPI.deleteAnnouncement(id);
        toast.success('Announcement deleted successfully');
        fetchAnnouncements();
      } catch (error) {
        console.error('Error deleting announcement:', error);
        toast.error('Failed to delete announcement');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'general',
      isImportant: false
    });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-bold text-white mb-6">Announcement Management</h1>
          
          {/* Create/Edit Form */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {isEditing ? 'Edit Announcement' : 'Create New Announcement'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Content</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="general">General</option>
                    <option value="event">Event</option>
                    <option value="career">Career</option>
                    <option value="academic">Academic</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isImportant"
                    id="isImportant"
                    checked={formData.isImportant}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded"
                  />
                  <label htmlFor="isImportant" className="ml-2 block text-gray-300">
                    Mark as Important
                  </label>
                </div>
                
                <div className="flex justify-end space-x-4">
                  {isEditing && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-500"
                  >
                    {isEditing ? 'Update Announcement' : 'Create Announcement'}
                  </button>
                </div>
              </div>
            </form>
          </div>
          
          {/* Announcements List */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">All Announcements</h2>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
              </div>
            ) : announcements.length === 0 ? (
              <p className="text-center py-8 text-gray-400">No announcements found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Important</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {announcements.map(announcement => (
                      <tr key={announcement._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {announcement.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            announcement.category === 'general' ? 'bg-blue-900 text-blue-300' :
                            announcement.category === 'event' ? 'bg-green-900 text-green-300' :
                            announcement.category === 'career' ? 'bg-purple-900 text-purple-300' :
                            'bg-yellow-900 text-yellow-300'
                          }`}>
                            {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(announcement.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {announcement.isImportant ? (
                            <span className="text-amber-500">Yes</span>
                          ) : (
                            <span className="text-gray-500">No</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <button
                            onClick={() => handleEdit(announcement)}
                            className="text-blue-400 hover:text-blue-300 mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(announcement._id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AnnouncementManagement; 