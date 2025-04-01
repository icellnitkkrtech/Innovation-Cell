import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    // First apply search filter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then apply category filter
    if (filter === 'all') return matchesSearch;
    if (filter === 'upcoming') {
      return matchesSearch && new Date(event.date) >= new Date();
    }
    if (filter === 'past') {
      return matchesSearch && new Date(event.date) < new Date();
    }
    return matchesSearch && event.category === filter;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Events</h1>
          <p className="text-xl text-gray-400">Discover and participate in our upcoming events</p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div className="w-full md:w-auto flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${
                filter === 'all' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-md ${
                filter === 'upcoming' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-4 py-2 rounded-md ${
                filter === 'past' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Past
            </button>
            <button
              onClick={() => setFilter('workshop')}
              className={`px-4 py-2 rounded-md ${
                filter === 'workshop' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Workshops
            </button>
            <button
              onClick={() => setFilter('seminar')}
              className={`px-4 py-2 rounded-md ${
                filter === 'seminar' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Seminars
            </button>
          </div>
        </div>
        
        {/* Events List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium text-gray-400">No events found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div key={event._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.imageUrl || 'https://via.placeholder.com/400x200?text=Event'} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      new Date(event.date) >= new Date()
                        ? 'bg-green-900 text-green-300'
                        : 'bg-red-900 text-red-300'
                    }`}>
                      {new Date(event.date) >= new Date() ? 'Upcoming' : 'Past'}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-4">
                    {event.description.length > 100
                      ? `${event.description.substring(0, 100)}...`
                      : event.description}
                  </p>
                  
                  <div className="flex items-center text-gray-500 mb-4">
                    <i className="far fa-calendar-alt mr-2"></i>
                    <span>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-6">
                    <i className="far fa-clock mr-2"></i>
                    <span>{format(new Date(event.date), 'h:mm a')}</span>
                    
                    <i className="fas fa-map-marker-alt ml-4 mr-2"></i>
                    <span>{event.location}</span>
                  </div>
                  
                  <Link
                    to={`/events/${event._id}`}
                    className="block w-full text-center py-2 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-md transition"
                  >
                    {new Date(event.date) >= new Date() ? 'View Details' : 'View Recap'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage; 