import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const FindMentorPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [expertise, setExpertise] = useState([]);

  useEffect(() => {
    if (!isAuthenticated || user.role !== 'student') {
      navigate('/login');
      return;
    }

    const fetchMentors = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getMentors();
        setMentors(response.data);
        
        // Extract unique expertise areas for filtering
        const allExpertise = response.data.flatMap(mentor => mentor.expertise || []);
        const uniqueExpertise = [...new Set(allExpertise)];
        setExpertise(uniqueExpertise);
      } catch (error) {
        console.error('Error fetching mentors:', error);
        toast.error('Failed to load mentors');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [isAuthenticated, user, navigate]);

  const handleRequestMentorship = (mentorId) => {
    navigate(`/mentorship/request/${mentorId}`);
  };

  const filteredMentors = mentors.filter(mentor => {
    // Search term filter
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mentor.jobTitle && mentor.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (mentor.company && mentor.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (mentor.expertise && mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase())));
    
    // Expertise filter
    const matchesExpertise = filter === 'all' || (mentor.expertise && mentor.expertise.includes(filter));
    
    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/mentorship')}
            className="flex items-center text-white mb-4 hover:underline"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Mentorship
          </button>
          <h1 className="text-3xl font-bold">Find a Mentor</h1>
          <p className="mt-2 text-amber-100">Connect with alumni who can guide you on your journey</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, job title, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Expertise Areas</option>
              {expertise.map((exp, index) => (
                <option key={index} value={exp}>{exp}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredMentors.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-medium text-gray-300">No mentors found</h3>
            <p className="mt-2 text-gray-400">
              {searchTerm || filter !== 'all'
                ? 'Try adjusting your search criteria'
                : 'There are no mentors available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMentors.map(mentor => (
              <div 
                key={mentor._id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                      {mentor.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold">{mentor.name}</h3>
                      <p className="text-gray-400">{mentor.jobTitle || 'Alumni'}</p>
                      {mentor.company && (
                        <p className="text-amber-500">{mentor.company}</p>
                      )}
                    </div>
                  </div>
                  
                  {mentor.mentorBio && (
                    <div className="mb-4">
                      <p className="text-gray-300 line-clamp-3">{mentor.mentorBio}</p>
                    </div>
                  )}
                  
                  {mentor.expertise && mentor.expertise.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((exp, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-300"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {mentor.availabilityHours && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Availability</h4>
                      <p className="text-gray-300">{mentor.availabilityHours}</p>
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleRequestMentorship(mentor._id)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-md"
                  >
                    Request Mentorship
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindMentorPage; 