import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentId, amount, type, itemName } = location.state || {};
  
  useEffect(() => {
    // If no payment data, redirect to home
    if (!paymentId) {
      navigate('/');
      return;
    }
    
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
    
    return () => clearInterval(interval);
  }, [paymentId, navigate]);
  
  // Get appropriate message based on payment type
  const getMessage = () => {
    switch (type) {
      case 'event':
        return `You're all set for ${itemName}! We've sent the details to your email.`;
      case 'membership':
        return `Welcome to the ${itemName} membership! Your benefits are now active.`;
      case 'donation':
        return 'Thank you for your generous donation! Your support means a lot to our community.';
      case 'project':
        return `Thank you for supporting the ${itemName} project! Your contribution will help make it a success.`;
      default:
        return 'Your payment has been processed successfully!';
    }
  };
  
  // Get appropriate next steps based on payment type
  const getNextSteps = () => {
    switch (type) {
      case 'event':
        return (
          <>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Check your email for event details and tickets
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Add the event to your calendar
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Invite friends to join you
            </li>
          </>
        );
      case 'membership':
        return (
          <>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Explore your new membership benefits
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Update your profile with your membership status
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Connect with other members
            </li>
          </>
        );
      default:
        return (
          <>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Check your email for payment confirmation
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              View your payment history in your account
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Contact support if you have any questions
            </li>
          </>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden"
      >
        <div className="p-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
            <p className="mt-2 text-gray-400">{getMessage()}</p>
            
            <div className="mt-4 bg-gray-750 rounded-md p-4 text-left">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-2">
                <span className="text-gray-400">Payment ID:</span>
                <span className="text-white font-mono">{paymentId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Amount:</span>
                <span className="text-amber-500 font-bold">${parseFloat(amount).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white text-left">Next Steps:</h3>
              <ul className="mt-2 space-y-2 text-gray-300 text-left">
                {getNextSteps()}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-750 px-6 py-4 flex justify-between">
          <Link
            to="/dashboard"
            className="text-amber-500 hover:text-amber-400 font-medium"
          >
            Go to Dashboard
          </Link>
          
          <Link
            to="/"
            className="text-gray-400 hover:text-white font-medium"
          >
            Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess; 