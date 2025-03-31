import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layouts/DashboardLayout';
import axios from 'axios';
import { toast } from 'react-toastify';

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clientName: '',
    clientEmail: '',
    budget: '',
    deadline: '',
    attachments: []
  });
  const [uploadingFiles, setUploadingFiles] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setUploadingFiles(true);
      
      // Create FormData for file upload
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        return {
          name: file.name,
          url: res.data.url
        };
      });
      
      const uploadedFiles = await Promise.all(uploadPromises);
      
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...uploadedFiles]
      });
      
      toast.success('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Failed to upload files');
    } finally {
      setUploadingFiles(false);
    }
  };

  const handleRemoveFile = (fileToRemove) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter(file => file.url !== fileToRemove.url)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, formData);
      
      toast.success('Project request submitted successfully');
      setFormData({
        title: '',
        description: '',
        clientName: '',
        clientEmail: '',
        budget: '',
        deadline: '',
        attachments: []
      });
      setShowNewProjectForm(false);
      fetchProjects();
    } catch (error) {
      console.error('Error submitting project:', error);
      toast.error(error.response?.data?.message || 'Failed to submit project');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-white">Projects</h1>
            {user?.role === 'alumni' && (
              <button
                type="button"
                onClick={() => setShowNewProjectForm(!showNewProjectForm)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                {showNewProjectForm ? 'Cancel' : 'Submit New Project'}
              </button>
            )}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* New Project Form */}
          {showNewProjectForm && (
            <div className="mt-6 bg-gray-800 shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-white">Submit a New Project Request</h3>
                <div className="mt-2 max-w-xl text-sm text-gray-400">
                  <p>Fill out the form below to submit a new project request for the iCell team to work on.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-5 space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                        Project Title
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          required
                          value={formData.title}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="clientName" className="block text-sm font-medium text-gray-300">
                        Client Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="clientName"
                          id="clientName"
                          required
                          value={formData.clientName}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-300">
                        Client Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="clientEmail"
                          id="clientEmail"
                          required
                          value={formData.clientEmail}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-300">
                        Budget (₹)
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="budget"
                          id="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="deadline" className="block text-sm font-medium text-gray-300">
                        Deadline
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          name="deadline"
                          id="deadline"
                          value={formData.deadline}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                        Project Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={4}
                          required
                          value={formData.description}
                          onChange={handleChange}
                          className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-700 rounded-md bg-gray-700 text-white"
                          placeholder="Describe the project requirements, goals, and any other relevant information."
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium text-gray-300">
                        Attachments
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-400">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-amber-500 hover:text-amber-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500"
                            >
                              <span>Upload files</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                multiple
                                onChange={handleFileUpload}
                                disabled={uploadingFiles}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-400">
                            PNG, JPG, PDF up to 10MB
                          </p>
                        </div>
                      </div>
                      
                      {/* Display uploaded files */}
                      {formData.attachments.length > 0 && (
                        <ul className="mt-4 border border-gray-700 rounded-md divide-y divide-gray-700">
                          {formData.attachments.map((file, index) => (
                            <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                              <div className="w-0 flex-1 flex items-center">
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="ml-2 flex-1 w-0 truncate text-white">{file.name}</span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFile(file)}
                                  className="font-medium text-amber-500 hover:text-amber-400"
                                >
                                  Remove
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowNewProjectForm(false)}
                      className="bg-gray-700 py-2 px-4 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || uploadingFiles}
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Submit Project'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Projects List */}
          <div className="mt-6">
            <h2 className="text-lg font-medium text-white mb-4">
              {user?.role === 'student' ? 'Available Projects' : 'Project Requests'}
            </h2>
            
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-800 p-4 rounded-md">
                    <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : projects.length > 0 ? (
              <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-700">
                  {projects.map((project) => (
                    <li key={project._id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-white truncate">{project.title}</p>
                            <div className={`ml-2 flex-shrink-0 flex`}>
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(project.status)}`}>
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                              </p>
                            </div>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="text-sm text-gray-400">
                              {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No deadline'}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-400">
                              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              {project.clientName}
                            </p>
                            {project.budget && (
                              <p className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0 sm:ml-6">
                                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                ₹{project.budget}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                        </div>
                        {user?.role === 'student' && project.status === 'approved' && (
                          <div className="mt-3">
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                            >
                              Apply for Project
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-md p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-white">No projects</h3>
                <p className="mt-1 text-sm text-gray-400">
                  {user?.role === 'student' 
                    ? 'No projects are available right now. Check back later.'
                    : 'No project requests have been submitted yet.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Projects; 