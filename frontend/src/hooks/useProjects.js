import { useState } from 'react';
import { projectsAPI } from '../services/api';
import { toast } from 'react-toastify';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all projects (filtered by role)
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectsAPI.getProjects();
      setProjects(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch projects');
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  // Get recent projects
  const fetchRecentProjects = async () => {
    try {
      setLoading(true);
      const res = await projectsAPI.getRecentProjects();
      setRecentProjects(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to fetch recent projects');
      toast.error('Failed to fetch recent projects');
    } finally {
      setLoading(false);
    }
  };

  // Create a new project
  const createProject = async (projectData) => {
    try {
      setLoading(true);
      const res = await projectsAPI.createProject(projectData);
      toast.success('Project created successfully');
      // Refresh projects after creation
      fetchProjects();
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Failed to create project';
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
    projects,
    recentProjects,
    loading,
    error,
    fetchProjects,
    fetchRecentProjects,
    createProject,
    clearError
  };
}; 