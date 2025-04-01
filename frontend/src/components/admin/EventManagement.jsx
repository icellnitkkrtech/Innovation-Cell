import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { adminAPI } from '../../services/api';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'webinar',
    registrationLink: '',
    isPublished: true
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getAllEvents();
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'webinar',
      registrationLink: '',
      isPublished: true
    });
    setShowAddModal(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
      time: event.time || '',
      location: event.location || '',
      type: event.type || 'webinar',
      registrationLink: event.registrationLink || '',
      isPublished: event.isPublished !== false
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
      setLoading(true);
      
      if (showAddModal) {
        await adminAPI.createEvent(formData);
        toast.success('Event created successfully');
      } else {
        await adminAPI.updateEvent(selectedEvent._id, formData);
        toast.success('Event updated successfully');
      }
      
      setShowAddModal(false);
      setShowEditModal(false);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await adminAPI.deleteEvent(eventId);
        toast.success('Event deleted successfully');
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        toast.error('Failed to delete event');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-white">Event Management</h2>
        <button
          type="button"
          onClick={handleAddEvent}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          Add New Event
        </button>
      </div>

      {/* Events List */}
      {loading && !showAddModal && !showEditModal ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-md">
              <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : events.length > 0 ? (
        <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-700">
            {events.map((event) => (
              <li key={event._id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-white truncate">{event.title}</h3>
                      <div className="mt-2 flex">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          event.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {event.isPublished ? 'Published' : 'Draft'}
                        </span>
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="text-amber-500 hover:text-amber-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400 line-clamp-2">{event.description}</p>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.date ? formatDate(event.date) : 'Date not set'}</span>
                    {event.time && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{event.time}</span>
                      </>
                    )}
                    {event.location && (
                      <>
                        <span className="mx-1">•</span>
                        <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-md p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-white">No events</h3>
          <p className="mt-1 text-sm text-gray-400">
            Get started by creating a new event.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleAddEvent}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Event
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Event Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                        {showAddModal ? 'Add New Event' : 'Edit Event'}
                      </h3>
                      
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-400">
                            Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-400">
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-400">
                              Date
                            </label>
                            <input
                              type="date"
                              name="date"
                              id="date"
                              required
                              value={formData.date}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-400">
                              Time
                            </label>
                            <input
                              type="time"
                              name="time"
                              id="time"
                              value={formData.time}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-400">
                            Location
                          </label>
                          <input
                            type="text"
                            name="location"
                            id="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-400">
                            Event Type
                          </label>
                          <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          >
                            <option value="webinar">Webinar</option>
                            <option value="workshop">Workshop</option>
                            <option value="conference">Conference</option>
                            <option value="meetup">Meetup</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="registrationLink" className="block text-sm font-medium text-gray-400">
                            Registration Link (optional)
                          </label>
                          <input
                            type="url"
                            name="registrationLink"
                            id="registrationLink"
                            value={formData.registrationLink}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="isPublished"
                            name="isPublished"
                            type="checkbox"
                            checked={formData.isPublished}
                            onChange={handleChange}
                            className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded"
                          />
                          <label htmlFor="isPublished" className="ml-2 block text-sm text-white">
                            Publish event (visible to users)
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
                    {showAddModal ? 'Create Event' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                    }}
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
    </div>
  );
};

export default EventManagement; 