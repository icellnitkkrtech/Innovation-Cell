import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layouts/DashboardLayout';
import axios from 'axios';
import { toast } from 'react-toastify';

const Events = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleRegister = async (eventId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/events/${eventId}/register`);
      
      // Update local state to reflect registration
      setEvents(events.map(event => 
        event._id === eventId 
          ? { ...event, attendees: [...event.attendees, user._id] } 
          : event
      ));
      
      toast.success('Successfully registered for the event');
      setShowEventModal(false);
    } catch (error) {
      console.error('Error registering for event:', error);
      toast.error('Failed to register for the event');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUserRegistered = (event) => {
    return event.attendees?.includes(user?._id);
  };

  const filteredEvents = events
    .filter(event => {
      if (filter === 'all') return true;
      if (filter === 'registered') return isUserRegistered(event);
      if (filter === 'upcoming') {
        return new Date(event.date) >= new Date();
      }
      return event.type === filter;
    })
    .filter(event => {
      if (!searchQuery) return true;
      return (
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">Events</h1>
              <p className="mt-1 text-sm text-gray-400">
                Discover and register for upcoming events, workshops, and webinars
              </p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">Search events</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-10 sm:text-sm border-gray-700 rounded-md bg-gray-700 text-white"
                  placeholder="Search events"
                />
              </div>
            </div>
            <div>
              <select
                id="filter"
                name="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md bg-gray-700 text-white"
              >
                <option value="all">All Events</option>
                <option value="registered">My Registrations</option>
                <option value="upcoming">Upcoming Events</option>
                <option value="webinar">Webinars</option>
                <option value="workshop">Workshops</option>
                <option value="meetup">Meetups</option>
                <option value="conference">Conferences</option>
                <option value="hackathon">Hackathons</option>
              </select>
            </div>
          </div>

          {/* Events List */}
          <div className="mt-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-800 shadow overflow-hidden sm:rounded-md animate-pulse">
                    <div className="px-4 py-5 sm:px-6">
                      <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-700">
                  {filteredEvents.map((event) => (
                    <li key={event._id}>
                      <div className="px-4 py-4 sm:px-6 hover:bg-gray-750 cursor-pointer" onClick={() => handleViewEvent(event)}>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-white truncate">{event.title}</p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-400">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              {formatDate(event.date)}
                              {event.time && ` at ${event.time}`}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0 sm:ml-6">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              {event.location || 'Online'}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0">
                            {isUserRegistered(event) ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Registered
                              </span>
                            ) : (
                              <span className="text-amber-500 hover:text-amber-400">
                                View details
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 text-center">
                  <p className="text-gray-400">No events found matching your criteria.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Event Details Modal */}
        {showEventModal && selectedEvent && (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
              </div>
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              
              <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg leading-6 font-medium text-white">{selectedEvent.title}</h3>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                            {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-4">
                        <div>
                          <p className="text-sm text-gray-400">{selectedEvent.description}</p>
                        </div>
                        
                        <div className="bg-gray-700 p-4 rounded-md">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-400">Date</p>
                              <p className="text-sm text-white">{formatDate(selectedEvent.date)}</p>
                            </div>
                            {selectedEvent.time && (
                              <div>
                                <p className="text-xs text-gray-400">Time</p>
                                <p className="text-sm text-white">{selectedEvent.time}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-xs text-gray-400">Location</p>
                              <p className="text-sm text-white">{selectedEvent.location || 'Online'}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Organizer</p>
                              <p className="text-sm text-white">{selectedEvent.organizer?.name || 'Alumni Association'}</p>
                            </div>
                          </div>
                        </div>
                        
                        {selectedEvent.registrationLink && (
                          <div>
                            <p className="text-xs text-gray-400">Registration Link</p>
                            <a 
                              href={selectedEvent.registrationLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-amber-500 hover:text-amber-400"
                            >
                              {selectedEvent.registrationLink}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  {isUserRegistered(selectedEvent) ? (
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm cursor-default"
                      disabled
                    >
                      Registered
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleRegister(selectedEvent._id)}
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-base font-medium text-white hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Register
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Events; 