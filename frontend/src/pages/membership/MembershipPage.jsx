import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI, paymentAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

const MembershipPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    const fetchMembership = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getMembership();
        setMembership(response.data);
      } catch (error) {
        console.error('Error fetching membership:', error);
        toast.error('Failed to load membership details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMembership();
  }, []);
  
  const handlePayment = async () => {
    try {
      setPaymentLoading(true);
      
      // Create payment intent
      const response = await paymentAPI.createPaymentIntent('membership', user._id, {
        month: currentMonth.toString(),
        year: currentYear
      });
      
      // Redirect to payment page
      navigate(`/payment/membership/${response.data.paymentId}`);
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Failed to initiate payment');
      setPaymentLoading(false);
    }
  };
  
  const hasCurrentMonthPayment = membership?.monthlyPayments?.some(
    payment => 
      payment.month === currentMonth.toString() && 
      payment.year === currentYear &&
      payment.status === 'paid'
  );
  
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
          <h1 className="text-3xl font-bold">Innovation Cell Membership</h1>
          <p className="mt-2 text-amber-100">Manage your monthly contributions</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Membership Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Membership Type</h3>
              <p className="text-2xl font-bold text-amber-500">
                {membership?.year === 'third_year' ? 'Third Year' : 'Final Year'}
              </p>
              <p className="text-gray-400 mt-1">
                Monthly contribution: ₹{membership?.year === 'third_year' ? '50' : '100'}
              </p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Total Paid</h3>
              <p className="text-2xl font-bold text-green-500">₹{membership?.totalPaid || 0}</p>
              <p className="text-gray-400 mt-1">
                Last payment: {membership?.lastPaymentDate ? format(new Date(membership.lastPaymentDate), 'MMM d, yyyy') : 'None'}
              </p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Total Due</h3>
              <p className="text-2xl font-bold text-red-500">₹{membership?.totalDue || 0}</p>
              <p className="text-gray-400 mt-1">
                {membership?.totalDue > 0 ? 'Payment required' : 'No pending payments'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Current Month Payment</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2">{months[currentMonth]} {currentYear}</h3>
              <p className="text-gray-300">
                {hasCurrentMonthPayment 
                  ? 'You have already paid for this month.' 
                  : 'Payment required for this month.'}
              </p>
            </div>
            
            <button
              onClick={handlePayment}
              disabled={paymentLoading || hasCurrentMonthPayment}
              className={`mt-4 md:mt-0 px-6 py-3 rounded-md ${
                hasCurrentMonthPayment 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
              } text-white`}
            >
              {paymentLoading 
                ? 'Processing...' 
                : hasCurrentMonthPayment 
                  ? 'Already Paid' 
                  : `Pay ₹${membership?.year === 'third_year' ? '50' : '100'}`}
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Payment History</h2>
          
          {membership?.monthlyPayments?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {membership.monthlyPayments
                    .sort((a, b) => new Date(b.paidOn) - new Date(a.paidOn))
                    .map((payment, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {months[parseInt(payment.month)]} {payment.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          ₹{payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {format(new Date(payment.paidOn), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === 'paid' 
                              ? 'bg-green-800 text-green-100' 
                              : payment.status === 'pending' 
                                ? 'bg-yellow-800 text-yellow-100' 
                                : 'bg-red-800 text-red-100'
                          }`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No payment history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembershipPage; 