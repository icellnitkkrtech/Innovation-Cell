import { useState } from 'react';
import { eventsAPI, projectsAPI } from '../services/api';
import { toast } from 'react-toastify';

export const useAdmin = () => {
  const [adminEvents, setAdminEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all events (admin)
  const fetchAllEvents = async () => {
    try {
      setLoading(true);
      const res = await eventsAPI.getAllEvents();
      setAdminEvents(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch events');
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  // Create event (admin)
  const createEvent = async (eventData) => {
    try {
      setLoading(true);
      const res = await eventsAPI.createEvent(eventData);
      toast.success('Event created successfully');
      // Refresh events after creation
      fetchAllEvents();
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to create event';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update event (admin)
  const updateEvent = async (eventId, eventData) => {
    try {
      setLoading(true);
      const res = await eventsAPI.updateEvent(eventId, eventData);
      toast.success('Event updated successfully');
      // Refresh events after update
      fetchAllEvents();
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to update event';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete event (admin)
  const deleteEvent = async (eventId) => {
    try {
      setLoading(true);
      await eventsAPI.deleteEvent(eventId);
      toast.success('Event deleted successfully');
      // Refresh events after deletion
      fetchAllEvents();
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to delete event';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update project status (admin)
  const updateProject = async (projectId, projectData) => {
    try {
      setLoading(true);
      const res = await projectsAPI.updateProject(projectId, projectData);
      toast.success('Project updated successfully');
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to update project';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete project (admin)
  const deleteProject = async (projectId) => {
    try {
      setLoading(true);
      await projectsAPI.deleteProject(projectId);
      toast.success('Project deleted successfully');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to delete project';
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
    adminEvents,
    loading,
    error,
    fetchAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    updateProject,
    deleteProject,
    clearError
  };
}; 