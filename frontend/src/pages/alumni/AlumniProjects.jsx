import React, { useState, useEffect } from 'react';
import { alumniAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AlumniProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    objectives: '',
    skills: [],
    timeline: '',
    status: 'Planning',
    collaborators: []
  });
  const [newSkill, setNewSkill] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    search: ''
  });

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await alumniAPI.getProjects(filters);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinProject = async (projectId) => {
    try {
      await alumniAPI.joinProject(projectId);
      toast.success('Successfully joined project!');
      fetchProjects(); // Refresh projects to update status
    } catch (error) {
      console.error('Error joining project:', error);
      toast.error('Failed to join project');
    }
  };

  const handleLeaveProject = async (projectId) => {
    try {
      await alumniAPI.leaveProject(projectId);
      toast.success('Successfully left project');
      fetchProjects(); // Refresh projects to update status
    } catch (error) {
      console.error('Error leaving project:', error);
      toast.error('Failed to leave project');
    }
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    try {
      await alumniAPI.proposeProject(newProject);
      toast.success('Project proposal submitted successfully!');
      setShowProjectModal(false);
      setNewProject({
        title: '',
        description: '',
        objectives: '',
        skills: [],
        timeline: '',
        status: 'Planning',
        collaborators: []
      });
      fetchProjects(); // Refresh projects list
    } catch (error) {
      console.error('Error submitting project proposal:', error);
      toast.error('Failed to submit project proposal');
    }
  };

  const addSkill = () => {
    if (newSkill.trim() !== '' && !newProject.skills.includes(newSkill.trim())) {
      setNewProject({
        ...newProject,
        skills: [...newProject.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setNewProject({
      ...newProject,
      skills: newProject.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Alumni Projects</h1>
        
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowProjectModal(true)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md"
          >
            Add New Project
          </button>
        </div>
        
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <div key={project._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                  <h3 className="text-xl font-medium text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">
                      {project.skills.length} skills
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">No projects found.</p>
          </div>
        )}
        
        {showProjectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
              
              <form onSubmit={handleSubmitProject}>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-1">Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={newProject.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Project Title"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-400 mb-1">Description*</label>
                  <textarea
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-400 mb-1">Objectives*</label>
                  <textarea
                    name="objectives"
                    value={newProject.objectives}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-400 mb-1">Skills Needed</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newProject.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {skill}
                        <button 
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-gray-400 hover:text-white"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a required skill"
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-r-md"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-400 mb-1">Timeline*</label>
                    <input
                      type="text"
                      name="timeline"
                      value={newProject.timeline}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 3 months, Fall 2023"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Status*</label>
                    <select
                      name="status"
                      value={newProject.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Planning">Planning</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-400 mb-1">Contact Email*</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={newProject.contactEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowProjectModal(false)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-md mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md"
                  >
                    Submit Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniProjects; 