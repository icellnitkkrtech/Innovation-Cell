import React, { useState, useEffect } from 'react';
import { alumniAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AlumniProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  
  // Initialize profile with default values for all properties
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    graduationYear: '',
    degree: '',
    major: '',
    currentPosition: '',
    company: '',
    industry: '',
    skills: [],
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: '',
      website: ''
    },
    privacySettings: {
      showEmail: false,
      showPhone: false,
      showLocation: true,
      showSocialLinks: true,
      allowMessaging: true
    }
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await alumniAPI.getUserProfile();
      
      // Ensure all required properties exist
      setProfile({
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        bio: data.bio || '',
        graduationYear: data.graduationYear || '',
        degree: data.degree || '',
        major: data.major || '',
        currentPosition: data.currentPosition || '',
        company: data.company || '',
        industry: data.industry || '',
        skills: data.skills || [],
        socialLinks: {
          linkedin: data.socialLinks?.linkedin || '',
          twitter: data.socialLinks?.twitter || '',
          facebook: data.socialLinks?.facebook || '',
          website: data.socialLinks?.website || ''
        },
        privacySettings: {
          showEmail: data.privacySettings?.showEmail || false,
          showPhone: data.privacySettings?.showPhone || false,
          showLocation: data.privacySettings?.showLocation !== false,
          showSocialLinks: data.privacySettings?.showSocialLinks !== false,
          allowMessaging: data.privacySettings?.allowMessaging !== false
        }
      });
      
      // Set image preview if available
      if (data.profileImage) {
        setImagePreview(data.profileImage);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const handlePrivacyChange = (e) => {
    const { name, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [name]: checked
      }
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await alumniAPI.updateUserProfile(profile);
      
      // If there's a new image preview that's different from the original
      if (imagePreview && imagePreview.startsWith('data:image')) {
        // Convert base64 to file
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        const file = new File([blob], "profile-image.jpg", { type: "image/jpeg" });
        
        const formData = new FormData();
        formData.append('profileImage', file);
        
        await alumniAPI.uploadProfileImage(formData);
      }
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-amber-600 mb-8">My Profile</h1>
      
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <i className="fas fa-user text-4xl"></i>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-gray-400 mb-2">Upload new picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                />
                <p className="mt-2 text-sm text-gray-500">Recommended: Square image, at least 300x300 pixels</p>
              </div>
            </div>
          </div>
          
          {/* Rest of the form remains the same */}
          {/* ... */}
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-semibold flex items-center"
            >
              {saving ? (
                <>
                  <span className="mr-2">Saving...</span>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlumniProfile;