import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/layouts/DashboardLayout';
import UserManagement from '../components/admin/UserManagement';
import ProjectManagement from '../components/admin/ProjectManagement';
import EventManagement from '../components/admin/EventManagement';
import PaymentManagement from '../components/admin/PaymentManagement';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-white">Admin Panel</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage users, projects, events, and payments
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {/* Tabs */}
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('users')}
                className={`${
                  activeTab === 'users'
                    ? 'border-amber-500 text-amber-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`${
                  activeTab === 'projects'
                    ? 'border-amber-500 text-amber-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`${
                  activeTab === 'events'
                    ? 'border-amber-500 text-amber-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`${
                  activeTab === 'payments'
                    ? 'border-amber-500 text-amber-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Payments
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'users' && <UserManagement />}
            {activeTab === 'projects' && <ProjectManagement />}
            {activeTab === 'events' && <EventManagement />}
            {activeTab === 'payments' && <PaymentManagement />}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminPanel; 