import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userAPI } from '../../services/api';

const JobPosting = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full_time',
    description: '',
    requirements: '',
    skills: [],
    salary: '',
    applicationUrl: '',
    contactEmail: '',
    deadline: ''
  });
  const [skill, setSkill] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
      setSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.skills.length === 0) {
      toast.error('Please add at least one required skill');
      return;
    }
    
    try {
      setSubmitting(true);
      await userAPI.createJobPosting(formData);
      toast.success('Job posting created successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Error creating job posting:', error);
      toast.error('Failed to create job posting');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Post a Job Opportunity</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-400">
              Job Title*
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
              placeholder="e.g. Software Engineer, Product Manager"
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-400">
              Company*
            </label>
            <input
              type="text"
              name="company"
              id="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
              placeholder="Company name"
            />
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-400">
              Location*
            </label>
            <input
              type="text"
              name="location"
              id="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
              placeholder="e.g. New York, Remote"
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-400">
              Job Type*
            </label>
            <select
              id="type"
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
            >
              <option value="full_time">Full-time</option>
              <option value="part_time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="temporary">Temporary</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-400">
              Salary Range (Optional)
            </label>
            <input
              type="text"
              name="salary"
              id="salary"
              value={formData.salary}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
              placeholder="e.g. $80,000 - $100,000"
            />
          </div>
          
          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-400">
              Job Description*
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              required
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
              placeholder="Provide a detailed description of the job..."
            ></textarea>
          </div>
          
          <div className="col-span-2">
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-400">
              Requirements*
            </label>
            <textarea
              id="requirements"
              name="requirements"
              rows="4"
              required
              value={formData.requirements}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
              placeholder="List the requirements for this position..."
            ></textarea>
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-400">
              Required Skills*
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="flex-1 rounded-none rounded-l-md border-gray-700 bg-gray-700 text-white focus:border-amber-500 focus:ring-amber-500"
                placeholder="Add a skill"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-700 bg-gray-600 text-gray-200 hover:bg-gray-500"
              >
                Add
              </button>
            </div>
            
            {formData.skills.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((s, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-600 text-white"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(s)}
                        className="ml-1.5 inline-flex text-white hover:text-gray-200 focus:outline-none"
                      >
                        <span className="sr-only">Remove</span>
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="applicationUrl" className="block text-sm font-medium text-gray-400">
              Application URL*
            </label>
            <input
              type="url"
              name="applicationUrl"
              id="applicationUrl"
              required
              value={formData.applicationUrl}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
              placeholder="https://..."
            />
          </div>
          
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-400">
              Contact Email*
            </label>
            <input
              type="email"
              name="contactEmail"
              id="contactEmail"
              required
              value={formData.contactEmail}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
              placeholder="contact@company.com"
            />
          </div>
          
          <div className="col-span-2">
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-400">
              Application Deadline*
            </label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              required
              value={formData.deadline}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
            />
          </div>
          
          <div className="col-span-2 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting Job...
                </>
              ) : (
                'Post Job Opportunity'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobPosting; 