import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import AdminLayout from '../components/admin/AdminLayout';
import UserManagement from '../components/admin/UserManagement';
import EventManagement from '../components/admin/EventManagement';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalAlumni: 0,
    totalEvents: 0,
    recentUsers: [],
    recentEvents: [],
    membershipStats: {
      totalPaid: 0,
      totalDue: 0,
      paidThisMonth: 0,
      pendingThisMonth: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const results = await Promise.allSettled([
        adminAPI.getDashboardStats(),
        adminAPI.getAllMemberships()
      ]);
      
      const [dashboardResult, membershipsResult] = results;
      
      if (dashboardResult.status === 'fulfilled') {
        setStats(prev => ({
          ...prev,
          ...dashboardResult.value.data
        }));
      }
      
      if (membershipsResult.status === 'fulfilled') {
        const memberships = membershipsResult.value.data;
        const currentMonth = new Date().getMonth().toString();
        const currentYear = new Date().getFullYear();
        
        // Calculate membership stats
        let totalPaid = 0;
        let totalDue = 0;
        let paidThisMonth = 0;
        let pendingThisMonth = 0;
        
        memberships.forEach(membership => {
          totalPaid += membership.totalPaid || 0;
          totalDue += membership.totalDue || 0;
          
          const hasCurrentMonthPayment = membership.monthlyPayments.some(
            payment => 
              payment.month === currentMonth && 
              payment.year === currentYear &&
              payment.status === 'paid'
          );
          
          if (hasCurrentMonthPayment) {
            paidThisMonth++;
          } else {
            pendingThisMonth++;
          }
        });
        
        setStats(prev => ({
          ...prev,
          membershipStats: {
            totalPaid,
            totalDue,
            paidThisMonth,
            pendingThisMonth
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="text-sm text-gray-400">
            Welcome back, <span className="text-amber-500 font-medium">{user?.name}</span>
          </div>
        </div>

        {/* Stats Overview */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-gray-800 rounded-lg p-6 h-32"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Students</p>
                  <h3 className="text-white text-3xl font-bold mt-1">{stats.totalStudents}</h3>
                </div>
                <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 text-blue-100 text-sm">
                Active learners in our platform
              </div>
            </motion.div>

            {/* Other existing stats cards */}
            {/* ... */}

            {/* Add Membership Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Monthly Contributions</p>
                  <h3 className="text-white text-3xl font-bold mt-1">₹{stats.membershipStats.totalPaid}</h3>
                </div>
                <div className="bg-pink-400 bg-opacity-30 p-3 rounded-full">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 text-pink-100 text-sm flex justify-between">
                <span>Paid this month: {stats.membershipStats.paidThisMonth}</span>
                <span>Pending: {stats.membershipStats.pendingThisMonth}</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Membership Overview */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Membership Overview</h2>
            <Link 
              to="/admin/memberships"
              className="text-amber-500 hover:text-amber-400 text-sm"
            >
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">Total Collected</h3>
              <p className="text-2xl font-bold text-green-400">₹{stats.membershipStats.totalPaid}</p>
              <p className="text-gray-400 text-sm mt-2">From all student contributions</p>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">Amount Due</h3>
              <p className="text-2xl font-bold text-red-400">₹{stats.membershipStats.totalDue}</p>
              <p className="text-gray-400 text-sm mt-2">Pending payments from students</p>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-white mb-2">This Month</h3>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-full bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500" 
                    style={{ 
                      width: `${stats.membershipStats.paidThisMonth / (stats.membershipStats.paidThisMonth + stats.membershipStats.pendingThisMonth) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className="text-white font-medium">
                  {Math.round(stats.membershipStats.paidThisMonth / (stats.membershipStats.paidThisMonth + stats.membershipStats.pendingThisMonth) * 100)}%
                </span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-green-400">{stats.membershipStats.paidThisMonth} Paid</span>
                <span className="text-red-400">{stats.membershipStats.pendingThisMonth} Pending</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => adminAPI.sendPaymentReminders().then(() => toast.success('Payment reminders sent successfully'))}
              className="bg-amber-600 hover:bg-amber-500 text-white py-2 px-4 rounded-md transition"
            >
              Send Payment Reminders
            </button>
          </div>
        </div>

        {/* Recent Users */}
        <div className="mt-8">
          <UserManagement recentUsers={stats.recentUsers} />
        </div>

        {/* Recent Events */}
        <div className="mt-8">
          <EventManagement />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 