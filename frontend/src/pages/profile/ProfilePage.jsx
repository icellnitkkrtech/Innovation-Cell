import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    graduationYear: '',
    major: '',
    company: '',
    jobTitle: '',
    linkedin: '',
    github: '',
    portfolio: '',
    skills: '',
    interests: '',
    isMentor: false,
    mentorBio: '',
    expertise: '',
    availabilityHours: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Populate form with user data
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
      graduationYear: user.graduationYear || '',
      major: user.major || '',
      company: user.company || '',
      jobTitle: user.jobTitle || '',
      linkedin: user.linkedin || '',
      github: user.github || '',
      portfolio: user.portfolio || '',
      skills: user.skills ? user.skills.join(', ') : '',
      interests: user.interests ? user.interests.join(', ') : '',
      isMentor: user.isMentor || false,
      mentorBio: user.mentorBio || '',
      expertise: user.expertise ? user.expertise.join(', ') : '',
      availabilityHours: user.availabilityHours || ''
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Convert comma-separated strings to arrays
      const updatedData = {
        ...formData,
        skills: formData.skills ? formData.skills.split(',').map(skill => skill.trim()) : [],
        interests: formData.interests ? formData.interests.split(',').map(interest => interest.trim()) : [],
        expertise: formData.expertise ? formData.expertise.split(',').map(exp => exp.trim()) : []
      };
      
      const response = await userAPI.updateProfile(updatedData);
      updateUser(response.data);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.msg || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      await userAPI.changePassword(passwordData);
      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(error.response?.data?.msg || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
    
    try {
      setLoading(true);
      await userAPI.deleteAccount();
      toast.success('Account deleted successfully');
      logout();
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error(error.response?.data?.msg || 'Failed to delete account');
      setLoading(false);
    }
  };

  const isAlumni = user && user.role === 'alumni';

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="mt-2 text-amber-100">Manage your personal information and account settings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
            
            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Major</label>
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Graduation Year</label>
                  <input
                    type="text"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                
                {isAlumni && (
                  <>
                    <div>
                      <label className="block text-gray-300 mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Job Title</label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </>
                )}
                
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  ></textarea>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mt-8 mb-6">Social Links</h2>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-gray-300 mb-2">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">GitHub</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="https://github.com/username"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Portfolio Website</label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
              
              <h2 className="text-xl font-bold mt-8 mb-6">Skills & Interests</h2>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-gray-300 mb-2">Skills (comma-separated)</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="JavaScript, React, Node.js"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Interests (comma-separated)</label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Web Development, AI, Data Science"
                  />
                </div>
              </div>
              
              {isAlumni && (
                <>
                  <h2 className="text-xl font-bold mt-8 mb-6">Mentorship Settings</h2>
                  
                  <div className="mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isMentor"
                        name="isMentor"
                        checked={formData.isMentor}
                        onChange={handleChange}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-600 rounded"
                      />
                      <label htmlFor="isMentor" className="ml-2 block text-gray-300">
                        I want to be a mentor
                      </label>
                    </div>
                  </div>
                  
                  {formData.isMentor && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="block text-gray-300 mb-2">Mentor Bio</label>
                        <textarea
                          name="mentorBio"
                          value={formData.mentorBio}
                          onChange={handleChange}
                          rows="4"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Tell students about your experience and how you can help them..."
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Areas of Expertise (comma-separated)</label>
                        <input
                          type="text"
                          name="expertise"
                          value={formData.expertise}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="Career Guidance, Technical Skills, Interview Prep"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Availability</label>
                        <input
                          type="text"
                          name="availabilityHours"
                          value={formData.availabilityHours}
                          onChange={handleChange}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="e.g., Weekdays after 6pm, Weekends"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
              
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Change Password</h2>
            
            <form onSubmit={handlePasswordSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-gray-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2 md:grid md:grid-cols-2 md:gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                      minLength="6"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                      minLength="6"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 text-red-500">Danger Zone</h2>
            
            <p className="text-gray-300 mb-6">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            
            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Delete Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 