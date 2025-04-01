import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { publicAPI, userAPI } from '../../services/api';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getEventById(id);
        setEvent(response.data);
        
        // Check if user is registered
        if (isAuthenticated && user && response.data.attendees) {
          setIsRegistered(response.data.attendees.includes(user._id));
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        toast.error('Failed to load event details');
        navigate('/events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate, isAuthenticated, user]);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      toast.info('Please log in to register for this event');
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    
    try {
      setRegistering(true);
      await userAPI.registerForEvent(id);
      toast.success('Successfully registered for event!');
      setIsRegistered(true);
    } catch (error) {
      console.error('Error registering for event:', error);
      toast.error(error.response?.data?.msg || 'Failed to register for event');
    } finally {
      setRegistering(false);
    }
  };

  const handlePayment = () => {
    if (!isAuthenticated) {
      toast.info('Please log in to register for this event');
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    
    navigate(`/payment/event/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <button
          onClick={() => navigate('/events')}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-500"
        >
          Back to Events
        </button>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/events')}
            className="flex items-center text-white mb-4 hover:underline"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Events
          </button>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="mt-2 text-amber-100">{format(eventDate, 'EEEE, MMMM d, yyyy • h:mm a')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              {event.image ? (
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gradient-to-r from-amber-600 to-orange-600">
                  <span className="text-4xl font-bold text-white">{event.title.charAt(0)}</span>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">About this event</h2>
                <p className="text-gray-300 whitespace-pre-line">{event.description}</p>
                
                {event.agenda && (
                  <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Agenda</h2>
                    <div className="text-gray-300 whitespace-pre-line">{event.agenda}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 sticky top-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Date and Time</h3>
                <p className="text-gray-300">{format(eventDate, 'EEEE, MMMM d, yyyy')}</p>
                <p className="text-gray-300">{format(eventDate, 'h:mm a')}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Location</h3>
                <p className="text-gray-300">{event.location}</p>
              </div>
              
              {event.organizer && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Organizer</h3>
                  <p className="text-gray-300">{event.organizer}</p>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Attendees</h3>
                <p className="text-gray-300">{event.attendees?.length || 0} people attending</p>
              </div>
              
              {event.ticketPrice > 0 ? (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Price</h3>
                  <p className="text-2xl font-bold text-amber-500">${event.ticketPrice.toFixed(2)}</p>
                </div>
              ) : (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Price</h3>
                  <p className="text-2xl font-bold text-amber-500">Free</p>
                </div>
              )}
              
              {isPastEvent ? (
                <button
                  disabled
                  className="w-full py-3 px-4 bg-gray-700 text-gray-400 rounded-md cursor-not-allowed"
                >
                  Event has ended
                </button>
              ) : isRegistered ? (
                <div className="text-center">
                  <div className="w-full py-3 px-4 bg-green-600 text-white rounded-md mb-3">
                    You're registered!
                  </div>
                  <p className="text-gray-400 text-sm">
                    Check your email for event details
                  </p>
                </div>
              ) : event.ticketPrice > 0 ? (
                <button
                  onClick={handlePayment}
                  disabled={registering}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {registering ? 'Processing...' : 'Buy Ticket'}
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={registering}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {registering ? 'Registering...' : 'Register Now'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage; 