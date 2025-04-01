import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const AdminMemberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, paid
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getAllMemberships();
        setMemberships(response.data);
      } catch (error) {
        console.error('Error fetching memberships:', error);
        toast.error('Failed to load membership data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMemberships();
  }, []);
  
  const filteredMemberships = memberships.filter(membership => {
    if (filter === 'all') return true;
    
    const hasCurrentMonthPayment = membership.monthlyPayments.some(
      payment => 
        payment.month === currentMonth.toString() && 
        payment.year === currentYear &&
        payment.status === 'paid'
    );
    
    return filter === 'pending' ? !hasCurrentMonthPayment : hasCurrentMonthPayment;
  });
  
  const sendReminders = async () => {
    try {
      await adminAPI.sendPaymentReminders();
      toast.success('Payment reminders sent successfully');
    } catch (error) {
      console.error('Error sending reminders:', error);
      toast.error('Failed to send payment reminders');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Membership Management</h1>
          <p className="mt-2 text-amber-100">Track and manage student contributions</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Membership Summary</h2>
            
            <div className="mt-4 md:mt-0 flex space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Members</option>
                <option value="pending">Pending Payments</option>
                <option value="paid">Paid This Month</option>
              </select>
              
              <button
                onClick={sendReminders}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-md"
              >
                Send Reminders
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Total Members</h3>
              <p className="text-2xl font-bold text-amber-500">{memberships.length}</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Paid This Month</h3>
              <p className="text-2xl font-bold text-green-500">
                {memberships.filter(m => 
                  m.monthlyPayments.some(p => 
                    p.month === currentMonth.toString() && 
                    p.year === currentYear &&
                    p.status === 'paid'
                  )
                ).length}
              </p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Pending Payments</h3>
              <p className="text-2xl font-bold text-red-500">
                {memberships.filter(m => 
                  !m.monthlyPayments.some(p => 
                    p.month === currentMonth.toString() && 
                    p.year === currentYear &&
                    p.status === 'paid'
                  )
                ).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Member List</h2>
          
          {filteredMemberships.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Monthly Fee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Paid</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Due</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredMemberships.map((membership) => {
                    const hasCurrentMonthPayment = membership.monthlyPayments.some(
                      payment => 
                        payment.month === currentMonth.toString() && 
                        payment.year === currentYear &&
                        payment.status === 'paid'
                    );
                    
                    return (
                      <tr key={membership._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold">
                              {membership.user?.name?.charAt(0) || 'S'}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{membership.user?.name}</div>
                              <div className="text-sm text-gray-400">{membership.user?.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {membership.year === 'third_year' ? 'Third Year' : 'Final Year'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          ₹{membership.year === 'third_year' ? '50' : '100'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          ₹{membership.totalPaid}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          ₹{membership.totalDue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            hasCurrentMonthPayment 
                              ? 'bg-green-800 text-green-100' 
                              : 'bg-red-800 text-red-100'
                          }`}>
                            {hasCurrentMonthPayment ? 'Paid' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <Link 
                            to={`/admin/memberships/${membership._id}`}
                            className="text-amber-500 hover:text-amber-400"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No members found matching the selected filter.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMemberships; 