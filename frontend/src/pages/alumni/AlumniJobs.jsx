import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { alumniAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AlumniJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    salary: '',
    applicationLink: '',
    contactEmail: ''
  });
  const [application, setApplication] = useState({
    coverLetter: '',
    resume: null
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await alumniAPI.getJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load job opportunities');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      await alumniAPI.postJob(newJob);
      toast.success('Job posted successfully!');
      setShowJobModal(false);
      setNewJob({
        title: '',
        company: '',
        location: '',
        type: 'Full-time',
        description: '',
        requirements: '',
        salary: '',
        applicationLink: '',
        contactEmail: ''
      });
      fetchJobs(); // Refresh jobs list
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job');
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('coverLetter', application.coverLetter);
      if (application.resume) {
        formData.append('resume', application.resume);
      }

      await alumniAPI.applyForJob(selectedJob._id, formData);
      toast.success('Application submitted successfully!');
      setShowApplyModal(false);
      setApplication({
        coverLetter: '',
        resume: null
      });
    } catch (error) {
      console.error('Error applying for job:', error);
      toast.error('Failed to submit application');
    }
  };

  // Filter jobs based on search term and filter
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && job.type === filter;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Job Opportunities</h1>
          <button 
            onClick={() => setShowPostJobModal(true)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Post a Job
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by title, company, location..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <select
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>
        
        {/* Jobs List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(4).fill().map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-700 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded mb-3 w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded mb-6 w-1/3"></div>
                <div className="h-20 bg-gray-700 rounded mb-4"></div>
                <div className="h-10 bg-gray-700 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map(job => (
                  <div key={job._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    <div className="p-6">
                      <h3 className="text-xl font-medium text-white mb-2">{job.title}</h3>
                      <div className="flex items-center mb-4">
                        <span className="text-amber-500 font-medium">{job.company}</span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-gray-400">{job.location}</span>
                      </div>
                      
                      <div className="mb-4">
                        <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2">
                          {job.type}
                        </span>
                        {job.salary && (
                          <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300">
                            {job.salary}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-400 mb-6 line-clamp-3">{job.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <Link
                          to={`/alumni/jobs/${job._id}`}
                          className="text-amber-500 hover:text-amber-400 font-medium"
                        >
                          View Details
                        </Link>
                        <span className="text-sm text-gray-500">
                          Posted {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">No job opportunities found matching your search criteria.</p>
              </div>
            )}
          </>
        )}
        
        {/* Post Job Modal */}
        {showPostJobModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Post a Job Opportunity</h2>
                  <button 
                    onClick={() => setShowPostJobModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                
                <form onSubmit={handlePostJob}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-400 mb-1">Job Title*</label>
                      <input
                        type="text"
                        name="title"
                        value={newJob.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Company*</label>
                      <input
                        type="text"
                        name="company"
                        value={newJob.company}
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
                        value={newJob.location}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Job Type*</label>
                      <select
                        name="type"
                        value={newJob.type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Description*</label>
                    <textarea
                      name="description"
                      value={newJob.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Requirements*</label>
                    <textarea
                      name="requirements"
                      value={newJob.requirements}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-400 mb-1">Application Link</label>
                      <input
                        type="url"
                        name="applicationLink"
                        value={newJob.applicationLink}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">Contact Email*</label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={newJob.contactEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowPostJobModal(false)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-md mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md"
                    >
                      Submit Job
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

export default AlumniJobs; 