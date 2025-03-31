import { useState, useEffect } from 'react';
import { eventsAPI } from '../services/api';
import { toast } from 'react-toastify';

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all published events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await eventsAPI.getPublishedEvents();
      setEvents(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch events');
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  // Get upcoming events
  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      const res = await eventsAPI.getUpcomingEvents();
      setUpcomingEvents(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch upcoming events');
      toast.error('Failed to fetch upcoming events');
    } finally {
      setLoading(false);
    }
  };

  // Register for an event
  const registerForEvent = async (eventId) => {
    try {
      setLoading(true);
      const res = await eventsAPI.registerForEvent(eventId);
      toast.success('Successfully registered for event');
      // Refresh events after registration
      fetchEvents();
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to register for event';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return {
    events,
    upcomingEvents,
    loading,
    error,
    fetchEvents,
    fetchUpcomingEvents,
    registerForEvent,
    clearError
  };
}; 