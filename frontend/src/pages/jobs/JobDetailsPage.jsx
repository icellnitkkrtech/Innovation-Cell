import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { publicAPI, userAPI } from '../../services/api';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await publicAPI.getJobById(id);
        setJob(response.data);
        
        // Check if deadline has passed
        const deadline = new Date(response.data.deadline);
        const today = new Date();
        setIsDeadlinePassed(deadline < today);
      } catch (error) {
        console.error('Error fetching job:', error);
        toast.error('Failed to load job details');
        navigate('/jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, navigate]);

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    
    if (job?.applicationUrl) {
      window.open(job.applicationUrl, '_blank');
    } else {
      navigate(`/jobs/${id}/apply`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Job not found</h2>
        <button
          onClick={() => navigate('/jobs')}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-500"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/jobs')}
            className="flex items-center text-white mb-4 hover:underline"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Jobs
          </button>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-amber-100">{job.company}</span>
            <span className="text-amber-100">•</span>
            <span className="text-amber-100">{job.location}</span>
            <span className="text-amber-100">•</span>
            <span className="text-amber-100 capitalize">{job.type.replace('_', ' ')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <div className="text-gray-300 whitespace-pre-line">{job.description}</div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Responsibilities</h2>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Qualifications</h2>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  {job.qualifications.map((qualification, index) => (
                    <li key={index}>{qualification}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 sticky top-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Job Type</h3>
                <p className="text-gray-300 capitalize">{job.type.replace('_', ' ')}</p>
              </div>
              
              {job.salary && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Salary</h3>
                  <p className="text-2xl font-bold text-amber-500">{job.salary}</p>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Application Deadline</h3>
                <p className={`text-lg ${isDeadlinePassed ? 'text-red-400' : 'text-gray-300'}`}>
                  {format(new Date(job.deadline), 'MMMM d, yyyy')}
                  {isDeadlinePassed && ' (Expired)'}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Posted By</h3>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold">
                    {job.postedBy?.name?.charAt(0) || 'A'}
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-300">{job.postedBy?.name || 'Alumni'}</p>
                    <p className="text-gray-400 text-sm">{job.postedBy?.jobTitle || ''}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Contact</h3>
                <p className="text-gray-300">{job.contactEmail}</p>
              </div>
              
              <button
                onClick={handleApply}
                disabled={isDeadlinePassed}
                className={`w-full py-3 px-4 rounded-md ${
                  isDeadlinePassed 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                }`}
              >
                {isDeadlinePassed ? 'Application Closed' : 'Apply Now'}
              </button>
              
              {isDeadlinePassed && (
                <p className="text-sm text-gray-400 text-center mt-2">
                  This job posting has expired
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage; 