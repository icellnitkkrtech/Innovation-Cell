import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { publicAPI } from '../../services/api';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const JobsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getJobs();
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to load job opportunities');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handlePostJob = () => {
    if (!isAuthenticated) {
      toast.info('Please log in to post a job');
      navigate('/login', { state: { from: '/jobs/post' } });
      return;
    }
    
    if (user.role !== 'alumni' && user.role !== 'admin') {
      toast.info('Only alumni and admins can post jobs');
      return;
    }
    
    navigate('/jobs/post');
  };

  const filteredJobs = jobs.filter(job => {
    // Search term filter
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Job type filter
    const matchesType = filter === 'all' || job.type === filter;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Job Opportunities</h1>
          <p className="mt-2 text-amber-100">Find and apply for jobs posted by alumni</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          
          <div className="flex space-x-4 w-full md:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Types</option>
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="remote">Remote</option>
            </select>
            
            <button
              onClick={handlePostJob}
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              Post a Job
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-medium text-gray-300">No job opportunities found</h3>
            <p className="mt-2 text-gray-400">
              {searchTerm 
                ? `No results for "${searchTerm}"` 
                : 'There are no job opportunities available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map(job => (
              <Link 
                key={job._id} 
                to={`/jobs/${job._id}`}
                className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <p className="text-gray-400 mt-1">{job.company} • {job.location}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-600 text-white">
                        {job.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-gray-300 line-clamp-2">{job.description}</p>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.slice(0, 5).map((skill, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 5 && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-300">
                        +{job.skills.length - 5} more
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between text-sm">
                    <div className="text-gray-400">
                      Posted by {job.postedBy?.name || 'Alumni'} on {format(new Date(job.createdAt), 'MMM d, yyyy')}
                    </div>
                    <div className="mt-2 md:mt-0 text-amber-500">
                      Apply by {format(new Date(job.deadline), 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage; 