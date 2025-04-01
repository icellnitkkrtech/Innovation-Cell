import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userAPI } from '../../services/api';

const MentorshipRequest = ({ mentorId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mentor, setMentor] = useState(null);
  const [formData, setFormData] = useState({
    message: '',
    topics: [],
    duration: '3_months'
  });
  const [customTopic, setCustomTopic] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getMentorById(mentorId);
        setMentor(response.data);
      } catch (error) {
        console.error('Error fetching mentor details:', error);
        toast.error('Failed to load mentor details');
        navigate('/mentorship/find');
      } finally {
        setLoading(false);
      }
    };

    if (mentorId) {
      fetchMentorDetails();
    }
  }, [mentorId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTopicChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        topics: prev.topics.filter(topic => topic !== value)
      }));
    }
  };

  const handleAddCustomTopic = () => {
    if (customTopic.trim() && !formData.topics.includes(customTopic.trim())) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, customTopic.trim()]
      }));
      setCustomTopic('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.topics.length === 0) {
      toast.error('Please select at least one topic');
      return;
    }
    
    if (formData.message.trim().length < 50) {
      toast.error('Please provide a more detailed message (at least 50 characters)');
      return;
    }
    
    try {
      setSubmitting(true);
      
      const requestData = {
        mentor: mentorId,
        message: formData.message,
        topics: formData.topics,
        duration: formData.duration
      };
      
      await userAPI.createMentorshipRequest(requestData);
      
      toast.success('Mentorship request sent successfully!');
      navigate('/mentorship');
    } catch (error) {
      console.error('Error sending mentorship request:', error);
      toast.error('Failed to send mentorship request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Mentor not found</p>
        <button
          onClick={() => navigate('/mentorship/find')}
          className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          Find Another Mentor
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="md:w-1/3">
          <div className="bg-gray-750 rounded-lg p-4">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                {mentor.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-white">{mentor.name}</h2>
                <p className="text-amber-500">{mentor.jobTitle}</p>
                <p className="text-gray-400 text-sm">{mentor.company}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium text-white">About</h3>
              <p className="text-gray-400 mt-1">{mentor.bio}</p>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium text-white">Expertise</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {mentor.expertise.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-700 rounded-full text-xs text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium text-white">Availability</h3>
              <p className="text-gray-400 mt-1">{mentor.availability}</p>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 md:ml-6 mt-6 md:mt-0">
          <h2 className="text-xl font-bold text-white mb-4">Request Mentorship</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400">
                  Your Message to {mentor.name.split(' ')[0]}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  placeholder={`Introduce yourself and explain why you'd like ${mentor.name.split(' ')[0]} to be your mentor...`}
                ></textarea>
                <p className="mt-1 text-sm text-gray-500">
                  Be specific about your goals and what you hope to learn. Minimum 50 characters.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Topics You'd Like to Discuss
                </label>
                <div className="mt-2 space-y-2">
                  {mentor.expertise.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        id={`topic-${index}`}
                        name={`topic-${index}`}
                        type="checkbox"
                        value={skill}
                        checked={formData.topics.includes(skill)}
                        onChange={handleTopicChange}
                        className="h-4 w-4 rounded border-gray-700 text-amber-600 focus:ring-amber-500"
                      />
                      <label htmlFor={`topic-${index}`} className="ml-2 text-sm text-gray-300">
                        {skill}
                      </label>
                    </div>
                  ))}
                  
                  <div className="flex items-center mt-2">
                    <input
                      type="text"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      className="block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Add a custom topic..."
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomTopic}
                      className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                      Add
                    </button>
                  </div>
                  
                  {formData.topics.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">Selected topics:</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {formData.topics.map((topic, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-600 text-white"
                          >
                            {topic}
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  topics: prev.topics.filter(t => t !== topic)
                                }));
                              }}
                              className="ml-1 inline-flex text-white focus:outline-none"
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
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-400">
                  Preferred Mentorship Duration
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-amber-500 focus:ring-amber-500"
                >
                  <option value="1_month">1 Month</option>
                  <option value="3_months">3 Months</option>
                  <option value="6_months">6 Months</option>
                  <option value="ongoing">Ongoing</option>
                </select>
              </div>
              
              <div className="pt-4">
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
                      Sending Request...
                    </>
                  ) : (
                    'Send Mentorship Request'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorshipRequest; 