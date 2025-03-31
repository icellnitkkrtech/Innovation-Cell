import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../../components/admin/AdminLayout';
import { toast } from 'react-toastify';
import { adminAPI } from '../../services/api';

const AdminSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Alumni Connect',
    siteDescription: 'Connect with alumni from your university',
    enableRegistration: true,
    requireEmailVerification: true,
    maxEventsPerPage: 10,
    maxUsersPerPage: 20
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await adminAPI.getSettings();
        setSettings(res.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await adminAPI.updateSettings(settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">System Settings</h1>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-700 px-6 py-4">
            <h2 className="text-xl font-bold text-white">General Settings</h2>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-400">
                    Site Name
                  </label>
                  <input
                    type="text"
                    name="siteName"
                    id="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-400">
                    Site Description
                  </label>
                  <input
                    type="text"
                    name="siteDescription"
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="maxEventsPerPage" className="block text-sm font-medium text-gray-400">
                    Max Events Per Page
                  </label>
                  <input
                    type="number"
                    name="maxEventsPerPage"
                    id="maxEventsPerPage"
                    min="5"
                    max="50"
                    value={settings.maxEventsPerPage}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="maxUsersPerPage" className="block text-sm font-medium text-gray-400">
                    Max Users Per Page
                  </label>
                  <input
                    type="number"
                    name="maxUsersPerPage"
                    id="maxUsersPerPage"
                    min="10"
                    max="100"
                    value={settings.maxUsersPerPage}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="enableRegistration"
                    name="enableRegistration"
                    type="checkbox"
                    checked={settings.enableRegistration}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded"
                  />
                  <label htmlFor="enableRegistration" className="ml-2 block text-sm text-white">
                    Enable User Registration
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="requireEmailVerification"
                    name="requireEmailVerification"
                    type="checkbox"
                    checked={settings.requireEmailVerification}
                    onChange={handleChange}
                    className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 rounded"
                  />
                  <label htmlFor="requireEmailVerification" className="ml-2 block text-sm text-white">
                    Require Email Verification
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Settings'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings; 