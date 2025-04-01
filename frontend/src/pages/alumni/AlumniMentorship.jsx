import React, { useState, useEffect } from 'react';
import { alumniAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const AlumniMentorship = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [mentorships, setMentorships] = useState([]);
  const [availableMentors, setAvailableMentors] = useState([]);
  const [mentorProfile, setMentorProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showMentorProfileModal, setShowMentorProfileModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [mentorshipRequest, setMentorshipRequest] = useState({
    goals: '',
    duration: '3 months',
    message: ''
  });
  const [newMentorProfile, setNewMentorProfile] = useState({
    expertise: [],
    bio: '',
    availability: '',
    expectations: '',
    isAvailable: true
  });
  const [newExpertise, setNewExpertise] = useState('');
  const [newMentorshipArea, setNewMentorshipArea] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (activeTab === 'overview') {
      fetchMentorships();
      fetchAvailableMentors();
      fetchMentorProfile();
    } else if (activeTab === 'find') {
      fetchAvailableMentors();
    } else if (activeTab === 'profile') {
      fetchMentorProfile();
    }
  }, [activeTab]);

  const fetchMentorships = async () => {
    try {
      setLoading(true);
      const response = await alumniAPI.getMentorships();
      setMentorships(response.data);
    } catch (error) {
      console.error('Error fetching mentorships:', error);
      toast.error('Failed to load mentorships');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableMentors = async () => {
    try {
      setLoading(true);
      const response = await alumniAPI.getAvailableMentors();
      setAvailableMentors(response.data);
    } catch (error) {
      console.error('Error fetching available mentors:', error);
      toast.error('Failed to load available mentors');
    } finally {
      setLoading(false);
    }
  };

  const fetchMentorProfile = async () => {
    try {
      setLoading(true);
      const response = await alumniAPI.getMentorProfile();
      setMentorProfile(response.data);
      
      // Initialize the form with existing data if available
      if (response.data) {
        setNewMentorProfile({
          expertise: response.data.expertise || [],
          bio: response.data.bio || '',
          availability: response.data.availability || '',
          expectations: response.data.expectations || '',
          isAvailable: response.data.isAvailable
        });
      }
    } catch (error) {
      console.error('Error fetching mentor profile:', error);
      toast.error('Failed to load mentor profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMentorProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addExpertise = () => {
    if (newExpertise.trim() && !newMentorProfile.expertise.includes(newExpertise.trim())) {
      setNewMentorProfile(prev => ({
        ...prev,
        expertise: [...prev.expertise, newExpertise.trim()]
      }));
      setNewExpertise('');
    }
  };

  const removeExpertise = (expertiseToRemove) => {
    setNewMentorProfile(prev => ({
      ...prev,
      expertise: prev.expertise.filter(item => item !== expertiseToRemove)
    }));
  };

  const addMentorshipArea = () => {
    if (newMentorshipArea.trim() && !newMentorProfile.mentorshipAreas.includes(newMentorshipArea.trim())) {
      setNewMentorProfile(prev => ({
        ...prev,
        mentorshipAreas: [...prev.mentorshipAreas, newMentorshipArea.trim()]
      }));
      setNewMentorshipArea('');
    }
  };

  const removeMentorshipArea = (areaToRemove) => {
    setNewMentorProfile(prev => ({
      ...prev,
      mentorshipAreas: prev.mentorshipAreas.filter(item => item !== areaToRemove)
    }));
  };

  const handleRequestMentorship = async (e) => {
    e.preventDefault();
    try {
      await alumniAPI.requestMentorship(selectedMentor._id, mentorshipRequest);
      toast.success('Mentorship request sent successfully!');
      setShowRequestModal(false);
      setMentorshipRequest({
        goals: '',
        duration: '3 months',
        message: ''
      });
    } catch (error) {
      console.error('Error requesting mentorship:', error);
      toast.error('Failed to send mentorship request');
    }
  };

  const handleUpdateMentorProfile = async (e) => {
    e.preventDefault();
    try {
      await alumniAPI.updateMentorProfile(newMentorProfile);
      toast.success('Mentor profile updated successfully!');
      setShowMentorProfileModal(false);
      fetchMentorProfile(); // Refresh mentor profile
    } catch (error) {
      console.error('Error updating mentor profile:', error);
      toast.error('Failed to update mentor profile');
    }
  };

  const handleAcceptMentorship = async (requestId) => {
    try {
      await alumniAPI.acceptMentorship(requestId);
      toast.success('Mentorship request accepted!');
      fetchMentorships(); // Refresh mentorships
    } catch (error) {
      console.error('Error accepting mentorship:', error);
      toast.error('Failed to accept mentorship request');
    }
  };

  const handleDeclineMentorship = async (requestId) => {
    try {
      await alumniAPI.declineMentorship(requestId);
      toast.success('Mentorship request declined');
      fetchMentorships(); // Refresh mentorships
    } catch (error) {
      console.error('Error declining mentorship:', error);
      toast.error('Failed to decline mentorship request');
    }
  };

  const handleEndMentorship = async (mentorshipId) => {
    try {
      await alumniAPI.endMentorship(mentorshipId);
      toast.success('Mentorship ended');
      fetchMentorships(); // Refresh mentorships
    } catch (error) {
      console.error('Error ending mentorship:', error);
      toast.error('Failed to end mentorship');
    }
  };

  // Filter mentorships by role and status
  const activeMentorships = mentorships.filter(m => 
    m.status === 'active' && (m.mentor._id === user._id || m.mentee._id === user._id)
  );
  
  const pendingMentorships = mentorships.filter(m => 
    m.status === 'pending' && (m.mentor._id === user._id || m.mentee._id === user._id)
  );
  
  const pastMentorships = mentorships.filter(m => 
    m.status === 'completed' && (m.mentor._id === user._id || m.mentee._id === user._id)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Mentorship Program</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'overview' 
                ? 'text-amber-500 border-b-2 border-amber-500' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'my-mentorships' 
                ? 'text-amber-500 border-b-2 border-amber-500' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('my-mentorships')}
          >
            My Mentorships
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'find' 
                ? 'text-amber-500 border-b-2 border-amber-500' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('find')}
          >
            Find a Mentor
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'profile' 
                ? 'text-amber-500 border-b-2 border-amber-500' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </div>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="bg-gray-800 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Alumni Mentorship Program</h2>
              <p className="text-gray-300 mb-6">
                Connect with experienced alumni who can provide guidance, share insights, and help you navigate your career path. 
                Whether you're seeking advice or looking to give back by becoming a mentor, our mentorship program facilitates 
                meaningful connections within our alumni community.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-amber-500 text-4xl mb-2">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Connect</h3>
                  <p className="text-gray-400">
                    Find mentors with experience in your field of interest and establish valuable connections.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-amber-500 text-4xl mb-2">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Learn</h3>
                  <p className="text-gray-400">
                    Gain insights, advice, and practical knowledge from those who've walked the path before you.
                  </p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6 text-center">
                  <div className="text-amber-500 text-4xl mb-2">
                    <i className="fas fa-hand-holding-heart"></i>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Give Back</h3>
                  <p className="text-gray-400">
                    Share your expertise and experiences to help fellow alumni grow in their careers.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => setActiveTab('find')}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                >
                  Find a Mentor
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                >
                  Become a Mentor
                </button>
              </div>
            </div>
            
            {/* Program Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-amber-900 to-amber-700 rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">
                  {availableMentors.length}
                </div>
                <p className="text-amber-200">Available Mentors</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">
                  {activeMentorships.length}
                </div>
                <p className="text-blue-200">Active Mentorships</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">
                  {pastMentorships.length}
                </div>
                <p className="text-green-200">Completed Mentorships</p>
              </div>
            </div>
            
            {/* Testimonials */}
            <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-gray-300 italic mb-4">
                  "The mentorship program connected me with an industry veteran who provided invaluable guidance 
                  as I navigated a career transition. Their insights helped me secure a position at my dream company."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-400">Class of 2018</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-gray-300 italic mb-4">
                  "Being a mentor has been incredibly rewarding. Sharing my experiences and watching my mentee grow 
                  professionally has been one of the most fulfilling aspects of my alumni involvement."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-700 mr-3"></div>
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-gray-400">Class of 2010</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* My Mentorships Tab */}
        {activeTab === 'my-mentorships' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Mentorships</h2>
            
            {loading ? (
              <div className="animate-pulse space-y-6">
                {Array(3).fill().map((_, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6">
                    <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Active Mentorships */}
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4">Active Mentorships</h3>
                  {activeMentorships.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeMentorships.map(mentorship => (
                        <div key={mentorship._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-lg font-medium">
                                  {mentorship.mentor._id === user._id ? 'Mentee: ' : 'Mentor: '}
                                  {mentorship.mentor._id === user._id ? mentorship.mentee.name : mentorship.mentor.name}
                                </h4>
                                <p className="text-amber-500">
                                  {mentorship.mentor._id === user._id ? 'You are mentoring' : 'You are being mentored'}
                                </p>
                              </div>
                              <span className="bg-green-800 text-green-200 text-xs px-2 py-1 rounded">Active</span>
                            </div>
                            
                            <p className="text-gray-400 mb-4">
                              Started on {new Date(mentorship.startDate).toLocaleDateString()}
                            </p>
                            
                            <div className="flex justify-between items-center">
                              <button className="text-blue-400 hover:text-blue-300">
                                <i className="fas fa-comment-alt mr-1"></i> Message
                              </button>
                              <button 
                                onClick={() => handleEndMentorship(mentorship._id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <i className="fas fa-times-circle mr-1"></i> End Mentorship
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-800 rounded-lg p-6 text-center">
                      <p className="text-gray-400">You don't have any active mentorships.</p>
                      <button 
                        onClick={() => setActiveTab('find')}
                        className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                      >
                        Find a Mentor
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Pending Requests */}
                {pendingRequests.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-medium mb-4">Pending Requests</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {pendingRequests.map(request => (
                        <div key={request._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-lg font-medium">
                                  {request.mentor._id === user._id ? 'From: ' : 'To: '}
                                  {request.mentor._id === user._id ? request.mentee.name : request.mentor.name}
                                </h4>
                                <p className="text-amber-500">
                                  {request.mentor._id === user._id ? 'Wants you as a mentor' : 'Waiting for response'}
                                </p>
                              </div>
                              <span className="bg-yellow-800 text-yellow-200 text-xs px-2 py-1 rounded">Pending</span>
                            </div>
                            
                            <p className="text-gray-400 mb-4">
                              Requested on {new Date(request.requestDate).toLocaleDateString()}
                            </p>
                            
                            {request.mentor._id === user._id ? (
                              <div className="flex justify-end space-x-3">
                                <button 
                                  onClick={() => handleAcceptMentorship(request._id)}
                                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                                >
                                  Accept
                                </button>
                                <button 
                                  onClick={() => handleDeclineMentorship(request._id)}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                                >
                                  Decline
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-end">
                                <button 
                                  onClick={() => cancelRequest(request._id)}
                                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                                >
                                  Cancel Request
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Past Mentorships */}
                {pastMentorships.length > 0 && (
                  <div>
                    <h3 className="text-xl font-medium mb-4">Past Mentorships</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {pastMentorships.map(mentorship => (
                        <div key={mentorship._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="text-lg font-medium">
                                  {mentorship.mentor._id === user._id ? 'Mentee: ' : 'Mentor: '}
                                  {mentorship.mentor._id === user._id ? mentorship.mentee.name : mentorship.mentor.name}
                                </h4>
                                <p className="text-gray-500">
                                  {mentorship.mentor._id === user._id ? 'You mentored' : 'You were mentored by'}
                                </p>
                              </div>
                              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">Completed</span>
                            </div>
                            
                            <p className="text-gray-400 mb-2">
                              {new Date(mentorship.startDate).toLocaleDateString()} - {new Date(mentorship.endDate).toLocaleDateString()}
                            </p>
                            
                            <div className="flex justify-end">
                              <button className="text-blue-400 hover:text-blue-300">
                                <i className="fas fa-star mr-1"></i> Leave Feedback
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        
        {/* Find a Mentor Tab */}
        {activeTab === 'find' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Find a Mentor</h2>
            
            {/* Search and Filter */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by name, expertise, industry..."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div className="w-full md:w-64">
                <select
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">All Areas</option>
                  <option value="career">Career Advice</option>
                  <option value="technical">Technical Skills</option>
                  <option value="leadership">Leadership</option>
                  <option value="entrepreneurship">Entrepreneurship</option>
                  <option value="academic">Academic Guidance</option>
                </select>
              </div>
            </div>
            
            {/* Mentors Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill().map((_, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6 animate-pulse">
                    <div className="flex justify-center mb-4">
                      <div className="w-24 h-24 bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="h-4 bg-gray-700 rounded mb-3"></div>
                    <div className="h-3 bg-gray-700 rounded mb-2 w-3/4 mx-auto"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
                    <div className="h-8 bg-gray-700 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {availableMentors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableMentors.map(mentor => (
                      <div key={mentor._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <div className="p-6 text-center">
                          <div className="flex justify-center mb-4">
                            <img 
                              src={mentor.avatar || "https://via.placeholder.com/150?text=Mentor"} 
                              alt={mentor.name} 
                              className="w-24 h-24 rounded-full object-cover"
                            />
                          </div>
                          <h3 className="text-lg font-medium text-white mb-1">{mentor.name}</h3>
                          <p className="text-amber-500 mb-2">{mentor.position} at {mentor.company}</p>
                          
                          <div className="flex flex-wrap justify-center gap-1 mb-4">
                            {mentor.expertise.slice(0, 3).map((exp, index) => (
                              <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                                {exp}
                              </span>
                            ))}
                            {mentor.expertise.length > 3 && (
                              <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
                                +{mentor.expertise.length - 3} more
                              </span>
                            )}
                          </div>
                          
                          <button 
                            onClick={() => {
                              setSelectedMentor(mentor);
                              setShowRequestModal(true);
                            }}
                            className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                          >
                            Request Mentorship
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-800 rounded-lg p-8 text-center">
                    <p className="text-gray-400">No mentors available at the moment.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Mentor Profile</h2>
            
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <p className="text-gray-300 mb-4">
                Share your knowledge and experience with fellow alumni. As a mentor, you'll have the opportunity to make a 
                meaningful impact on someone's professional journey while also developing your leadership and coaching skills.
              </p>
              
              <h3 className="text-xl font-medium mb-3">Benefits of Being a Mentor:</h3>
              <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
                <li>Strengthen your leadership and communication skills</li>
                <li>Expand your professional network</li>
                <li>Gain fresh perspectives from mentees</li>
                <li>Make a positive impact on the alumni community</li>
                <li>Reflect on and articulate your own professional experiences</li>
              </ul>
              
              <p className="text-gray-300">
                Complete the form below to set up your mentor profile and indicate your availability.
              </p>
            </div>
            
            <form onSubmit={handleUpdateMentorProfile} className="bg-gray-800 rounded-lg p-6">
              <div className="mb-4">
                <label className="flex items-center space-x-2 text-gray-300 mb-2">
                  <input
                    type="checkbox"
                    name="isAvailable"
                    checked={newMentorProfile.isAvailable}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-600 text-amber-600 focus:ring-amber-500 bg-gray-700"
                  />
                  <span>I am available to mentor</span>
                </label>
                <p className="text-sm text-gray-500">
                  You can toggle this setting at any time to control your availability.
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Areas of Expertise</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newMentorProfile.expertise.map((item, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {item}
                      <button 
                        type="button"
                        onClick={() => removeExpertise(item)}
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
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    placeholder="Add area of expertise"
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                  />
                  <button
                    type="button"
                    onClick={addExpertise}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-r-md"
                  >
                    Add
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Examples: Software Development, Marketing, Finance, Leadership, etc.
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Mentorship Areas</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newMentorProfile.mentorshipAreas.map((item, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {item}
                      <button 
                        type="button"
                        onClick={() => removeMentorshipArea(item)}
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
                    value={newMentorshipArea}
                    onChange={(e) => setNewMentorshipArea(e.target.value)}
                    placeholder="Add mentorship area"
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMentorshipArea())}
                  />
                  <button
                    type="button"
                    onClick={addMentorshipArea}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-r-md"
                  >
                    Add
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Examples: Career Transitions, Technical Skills, Work-Life Balance, etc.
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Availability</label>
                <select
                  name="availability"
                  value={newMentorProfile.availability}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select Availability</option>
                  <option value="1-2 hours per month">1-2 hours per month</option>
                  <option value="3-4 hours per month">3-4 hours per month</option>
                  <option value="5+ hours per month">5+ hours per month</option>
                  <option value="As needed">As needed</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Expectations & Preferences</label>
                <textarea
                  name="expectations"
                  value={newMentorProfile.expectations}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your mentoring style, expectations from mentees, and any preferences..."
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-md flex items-center transition-colors disabled:opacity-70"
                >
                  {savingProfile ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save mr-2"></i>
                      Save Mentor Profile
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniMentorship;