import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { adminAPI } from '../../services/api';
import { format } from 'date-fns';

const ProjectManagement = ({ recentProjects = null }) => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(recentProjects === null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'planning',
    budget: '',
    leadMember: '',
    teamMembers: []
  });

  useEffect(() => {
    if (recentProjects) {
      setProjects(recentProjects);
      setLoading(false);
    } else {
      fetchProjects();
    }
    fetchUsers();
  }, [recentProjects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getAllProjects();
      console.log('Fetched projects:', res.data);
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await adminAPI.getAllUsers();
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    }
  };

  const handleAddProject = () => {
    setFormData({
      title: '',
      description: '',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: '',
      status: 'planning',
      budget: '',
      leadMember: '',
      teamMembers: []
    });
    setShowAddModal(true);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      startDate: project.startDate ? format(new Date(project.startDate), 'yyyy-MM-dd') : '',
      endDate: project.endDate ? format(new Date(project.endDate), 'yyyy-MM-dd') : '',
      status: project.status,
      budget: project.budget || '',
      leadMember: project.leadMember?._id || '',
      teamMembers: project.teamMembers?.map(member => member._id) || []
    });
    setShowEditModal(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await adminAPI.deleteProject(projectId);
        toast.success('Project deleted successfully');
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (name === 'teamMembers') {
      // Handle multi-select for team members
      const options = e.target.options;
      const selectedValues = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }
      setFormData({
        ...formData,
        teamMembers: selectedValues
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'number' ? parseFloat(value) : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (showAddModal) {
        await adminAPI.createProject(formData);
        toast.success('Project created successfully');
      } else {
        await adminAPI.updateProject(selectedProject._id, formData);
        toast.success('Project updated successfully');
      }
      
      setShowAddModal(false);
      setShowEditModal(false);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  // Filter projects based on search term and status filter
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-600';
      case 'in-progress':
        return 'bg-amber-600';
      case 'completed':
        return 'bg-green-600';
      case 'on-hold':
        return 'bg-purple-600';
      case 'cancelled':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="bg-gray-700 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold text-white">
          {recentProjects ? 'Recent Projects' : 'Project Management'}
        </h2>
        
        {!recentProjects && (
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <button
              onClick={handleAddProject}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-md hover:from-amber-600 hover:to-orange-600 transition-colors"
            >
              Add Project
            </button>
            <button
              onClick={fetchProjects}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
      
      {!recentProjects && (
        <div className="p-4 bg-gray-750 border-b border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Statuses</option>
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No projects found. {!recentProjects && 'Create your first project by clicking "Add Project".'}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map(project => (
              <div 
                key={project._id}
                className="bg-gray-750 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between border border-gray-700 hover:border-amber-500 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">{project.title}</h3>
                  <p className="text-gray-400 mt-1 line-clamp-2">{project.description}</p>
                  
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                    </span>
                    
                    <span className="text-gray-400 text-sm">
                      {project.startDate ? format(new Date(project.startDate), 'MMM d, yyyy') : 'No start date'} 
                      {project.endDate ? ` - ${format(new Date(project.endDate), 'MMM d, yyyy')}` : ''}
                    </span>
                    
                    {project.budget && (
                      <span className="text-green-400 text-sm">
                        ${project.budget.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  {project.leadMember && (
                    <div className="mt-2 text-sm text-gray-400">
                      Lead: <span className="text-amber-400">{project.leadMember.name}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 w-full md:w-auto mt-4 md:mt-0">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Add/Edit Project Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                        {showAddModal ? 'Add New Project' : 'Edit Project'}
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
                            name="description"
                            id="description"
                            required
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          ></textarea>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-400">
                              Start Date
                            </label>
                            <input
                              type="date"
                              name="startDate"
                              id="startDate"
                              required
                              value={formData.startDate}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-400">
                              End Date
                            </label>
                            <input
                              type="date"
                              name="endDate"
                              id="endDate"
                              value={formData.endDate}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-400">
                              Status
                            </label>
                            <select
                              id="status"
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                            >
                              <option value="planning">Planning</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="on-hold">On Hold</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="budget" className="block text-sm font-medium text-gray-400">
                              Budget ($)
                            </label>
                            <input
                              type="number"
                              name="budget"
                              id="budget"
                              min="0"
                              step="0.01"
                              value={formData.budget}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="leadMember" className="block text-sm font-medium text-gray-400">
                            Lead Member
                          </label>
                          <select
                            id="leadMember"
                            name="leadMember"
                            value={formData.leadMember}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          >
                            <option value="">Select Lead Member</option>
                            {users.map(user => (
                              <option key={user._id} value={user._id}>
                                {user.name} ({user.email})
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="teamMembers" className="block text-sm font-medium text-gray-400">
                            Team Members (hold Ctrl/Cmd to select multiple)
                          </label>
                          <select
                            id="teamMembers"
                            name="teamMembers"
                            multiple
                            value={formData.teamMembers}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500 h-32"
                          >
                            {users.map(user => (
                              <option key={user._id} value={user._id}>
                                {user.name} ({user.email})
                              </option>
                            ))}
                          </select>
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
                    {showAddModal ? 'Create Project' : 'Save Changes'}
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
    </motion.div>
  );
};

export default ProjectManagement; 