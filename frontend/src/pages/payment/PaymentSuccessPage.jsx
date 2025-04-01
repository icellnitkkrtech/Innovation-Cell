import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, amount, date } = location.state || {};
  
  const getRedirectPath = () => {
    switch (type) {
      case 'membership':
        return '/membership';
      case 'event':
        return '/events';
      case 'donation':
        return '/donate';
      default:
        return '/';
    }
  };
  
  const getPaymentTitle = () => {
    switch (type) {
      case 'membership':
        return 'Monthly Contribution';
      case 'event':
        return 'Event Registration';
      case 'donation':
        return 'Donation';
      default:
        return 'Payment';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-400 mb-6">Your payment has been processed successfully.</p>
        
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Payment Type:</span>
            <span className="font-medium">{getPaymentTitle()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Amount:</span>
            <span className="font-medium">₹{amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Date:</span>
            <span className="font-medium">{date ? format(new Date(date), 'MMM d, yyyy, h:mm a') : 'N/A'}</span>
          </div>
        </div>
        
        <button
          onClick={() => navigate(getRedirectPath())}
          className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage; 