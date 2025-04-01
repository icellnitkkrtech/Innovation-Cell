import React, { useState, useEffect } from 'react';
import { alumniAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AlumniEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'In-Person',
    registrationLink: '',
    organizer: ''
  });

  useEffect(() => {
    fetchEvents();
  }, [activeTab]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const filters = { status: activeTab };
      const response = await alumniAPI.getEvents(filters);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    try {
      await alumniAPI.proposeEvent(newEvent);
      toast.success('Event proposal submitted successfully!');
      setShowEventModal(false);
      setNewEvent({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        type: 'In-Person',
        registrationLink: '',
        organizer: ''
      });
      if (activeTab === 'upcoming') {
        fetchEvents(); // Refresh events if we're on the upcoming tab
      }
    } catch (error) {
      console.error('Error submitting event proposal:', error);
      toast.error('Failed to submit event proposal');
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await alumniAPI.registerForEvent(eventId);
      toast.success('Successfully registered for event!');
      fetchEvents(); // Refresh events to update registration status
    } catch (error) {
      console.error('Error registering for event:', error);
      toast.error('Failed to register for event');
    }
  };

  const handleCancelRegistration = async (eventId) => {
    try {
      await alumniAPI.cancelEventRegistration(eventId);
      toast.success('Registration cancelled');
      fetchEvents(); // Refresh events to update registration status
    } catch (error) {
      console.error('Error cancelling registration:', error);
      toast.error('Failed to cancel registration');
    }
  };

  // Filter events based on active tab
  const currentDate = new Date();
  const upcomingEvents = events.filter(event => new Date(event.dateTime) >= currentDate);
  const pastEvents = events.filter(event => new Date(event.dateTime) < currentDate);
  const myEvents = events.filter(event => event.isRegistered);

  // Sort events by date
  upcomingEvents.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  pastEvents.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)); // Past events in reverse chronological order

  // Get events based on active tab
  const displayEvents = activeTab === 'upcoming' ? upcomingEvents : 
                        activeTab === 'past' ? pastEvents : myEvents;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Alumni Events</h1>
          <button 
            onClick={() => setShowEventModal(true)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Propose an Event
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'upcoming' 
                ? 'text-amber-500 border-b-2 border-amber-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'past' 
                ? 'text-amber-500 border-b-2 border-amber-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Past Events
          </button>
          <button
            onClick={() => setActiveTab('my-events')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'my-events' 
                ? 'text-amber-500 border-b-2 border-amber-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Events
          </button>
        </div>
        
        {/* Events List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(4).fill().map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
                <div className="h-20 bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-700 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {displayEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayEvents.map(event => (
                  <div key={event._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    {event.image && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-medium text-white">{event.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${
                          event.type === 'Virtual' 
                            ? 'bg-blue-900 text-blue-200' 
                            : 'bg-green-900 text-green-200'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-400 mb-4">
                        <i className="far fa-calendar-alt mr-2"></i>
                        <span>
                          {new Date(event.dateTime).toLocaleDateString()} at {new Date(event.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-400 mb-4">
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        <span>{event.location}</span>
                      </div>
                      
                      <p className="text-gray-300 mb-6">{event.description}</p>
                      
                      <div className="flex justify-between items-center">
                        {new Date(event.dateTime) >= currentDate ? (
                          event.isRegistered ? (
                            <button
                              onClick={() => handleCancelRegistration(event._id)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                            >
                              Cancel Registration
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRegister(event._id)}
                              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                            >
                              Register Now
                            </button>
                          )
                        ) : (
                          <span className="text-gray-500">Event Ended</span>
                        )}
                        
                        {event.registrationLink && (
                          <a 
                            href={event.registrationLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            More Info
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">
                  {activeTab === 'upcoming' ? 'No upcoming events scheduled.' : 
                   activeTab === 'past' ? 'No past events to display.' : 
                   'You haven\'t registered for any events yet.'}
                </p>
                {activeTab === 'my-events' && (
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                  >
                    Browse Upcoming Events
                  </button>
                )}
              </div>
            )}
          </>
        )}
        
        {/* Propose Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Propose an Event</h2>
                  <button 
                    onClick={() => setShowEventModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                
                <form onSubmit={handleSubmitEvent}>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Event Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Description*</label>
                    <textarea
                      name="description"
                      value={newEvent.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Date*</label>
                      <input
                        type="date"
                        name="date"
                        value={newEvent.date}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Time*</label>
                      <input
                        type="time"
                        name="time"
                        value={newEvent.time}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Location*</label>
                      <input
                        type="text"
                        name="location"
                        value={newEvent.location}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Event Type*</label>
                      <select
                        name="type"
                        value={newEvent.type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="In-Person">In-Person</option>
                        <option value="Virtual">Virtual</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-400 mb-1">Registration Link</label>
                      <input
                        type="url"
                        name="registrationLink"
                        value={newEvent.registrationLink}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Organizer*</label>
                      <input
                        type="text"
                        name="organizer"
                        value={newEvent.organizer}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowEventModal(false)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-md mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md"
                    >
                      Submit Proposal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniEvents; 