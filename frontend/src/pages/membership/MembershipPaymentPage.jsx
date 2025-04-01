import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userAPI, paymentAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const MembershipPaymentPage = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        setLoading(true);
        const response = await paymentAPI.getPaymentStatus(paymentId);
        setPaymentDetails(response.data);
      } catch (error) {
        console.error('Error fetching payment details:', error);
        toast.error('Failed to load payment details');
        navigate('/membership');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaymentDetails();
  }, [paymentId, navigate]);
  
  const handlePayment = async () => {
    try {
      setProcessing(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Complete payment
      await userAPI.payMembership({
        month: paymentDetails.month,
        year: paymentDetails.year,
        paymentId: paymentId
      });
      
      toast.success('Payment successful!');
      navigate('/payment/success', { 
        state: { 
          type: 'membership',
          amount: paymentDetails.amount,
          date: new Date().toISOString()
        } 
      });
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Payment failed. Please try again.');
      setProcessing(false);
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
          <h1 className="text-3xl font-bold">Complete Your Payment</h1>
          <p className="mt-2 text-amber-100">Innovation Cell Monthly Contribution</p>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Payment Details</h2>
            
            <div className="mb-8">
              <div className="bg-gray-700 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">Monthly Contribution</h3>
                    <p className="text-gray-400 mt-1">
                      {months[parseInt(paymentDetails?.month)]} {paymentDetails?.year}
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-amber-500">
                    ₹{paymentDetails?.amount}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
                
                <div className="space-y-4">
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer ${
                      paymentMethod === 'card' 
                        ? 'border-amber-500 bg-gray-700' 
                        : 'border-gray-700 hover:bg-gray-700'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'card'} 
                        onChange={() => setPaymentMethod('card')}
                        className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 bg-gray-800"
                      />
                      <label className="ml-3 block text-white">
                        Credit/Debit Card
                      </label>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer ${
                      paymentMethod === 'upi' 
                        ? 'border-amber-500 bg-gray-700' 
                        : 'border-gray-700 hover:bg-gray-700'
                    }`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'upi'} 
                        onChange={() => setPaymentMethod('upi')}
                        className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 bg-gray-800"
                      />
                      <label className="ml-3 block text-white">
                        UPI
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Card Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Card Number</label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">CVV</label>
                      <input 
                        type="text" 
                        placeholder="123"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Name on Card</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {paymentMethod === 'upi' && (
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">UPI Details</h3>
                
                <div>
                  <label className="block text-gray-300 mb-2">UPI ID</label>
                  <input 
                    type="text" 
                    placeholder="yourname@upi"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              <button
                onClick={() => navigate('/membership')}
                className="px-6 py-3 bg-gray-700 text-white rounded-md mr-4 hover:bg-gray-600"
              >
                Cancel
              </button>
              
              <button
                onClick={handlePayment}
                disabled={processing}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Processing...' : `Pay ₹${paymentDetails?.amount}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPaymentPage; 