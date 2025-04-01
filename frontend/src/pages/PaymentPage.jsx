import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { publicAPI, userAPI } from '../services/api';
import { format } from 'date-fns';

const PaymentPage = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const { type, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const amount = queryParams.get('amount');
  
  const [paymentData, setPaymentData] = useState({
    amount: amount || '',
    paymentMethod: 'credit_card',
    description: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [itemDetails, setItemDetails] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [loadingItem, setLoadingItem] = useState(true);
  
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      toast.error('Please log in to make a payment');
      navigate('/login', { state: { from: location.pathname + location.search } });
      return;
    }
    
    if (type && id) {
      fetchItemDetails();
    } else if (type === 'donation') {
      setItemDetails({
        title: 'Donation to Alumni Association',
        description: 'Thank you for your generous donation to support our programs and initiatives.'
      });
      setLoadingItem(false);
    }
  }, [type, id, isAuthenticated, loading]);
  
  const fetchItemDetails = async () => {
    try {
      setLoadingItem(true);
      let response;
      
      switch (type) {
        case 'event':
          response = await publicAPI.getEventById(id);
          setItemDetails(response.data);
          if (!paymentData.amount && response.data.ticketPrice) {
            setPaymentData(prev => ({ ...prev, amount: response.data.ticketPrice }));
          }
          break;
        case 'membership':
          response = await publicAPI.getMembershipTier(id);
          setItemDetails(response.data);
          if (!paymentData.amount && response.data.price) {
            setPaymentData(prev => ({ ...prev, amount: response.data.price }));
          }
          break;
        case 'project':
          response = await publicAPI.getProjectById(id);
          setItemDetails(response.data);
          break;
        default:
          toast.error('Invalid payment type');
          navigate('/');
      }
    } catch (error) {
      console.error('Error fetching item details:', error);
      toast.error('Failed to load details for this payment');
    } finally {
      setLoadingItem(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please log in to make a payment');
      navigate('/login', { state: { from: location.pathname + location.search } });
      return;
    }
    
    // Basic validation
    if (!paymentData.amount || parseFloat(paymentData.amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (paymentData.paymentMethod === 'credit_card') {
      if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.expiryDate || !paymentData.cvv) {
        toast.error('Please fill in all card details');
        return;
      }
      
      // Simple card validation
      if (!/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
        toast.error('Please enter a valid 16-digit card number');
        return;
      }
      
      if (!/^\d{3,4}$/.test(paymentData.cvv)) {
        toast.error('Please enter a valid CVV code');
        return;
      }
    }
    
    try {
      setProcessingPayment(true);
      
      // Create payment object
      const payment = {
        amount: parseFloat(paymentData.amount),
        currency: 'USD',
        paymentMethod: paymentData.paymentMethod,
        description: paymentData.description || `Payment for ${type}: ${itemDetails?.title || 'Unknown'}`,
        relatedTo: type,
        relatedId: id || null
      };
      
      // In a real application, you would process the payment with a payment gateway here
      // For this demo, we'll simulate a payment process
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Process payment
      const response = await userAPI.createPayment(payment);
      
      // Handle specific payment types
      if (type === 'event') {
        // Register for the event
        await userAPI.registerForEvent(id);
      } else if (type === 'membership') {
        // Update user membership
        await userAPI.updateMembership(id);
      }
      
      toast.success('Payment processed successfully!');
      
      // Redirect to success page
      navigate('/payment/success', { 
        state: { 
          paymentId: response.data._id,
          amount: payment.amount,
          type: type,
          itemName: itemDetails?.title
        } 
      });
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.msg || 'Payment failed. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };
  
  if (loading || loadingItem) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">
            {type === 'donation' ? 'Make a Donation' : `Payment for ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            {type === 'donation' 
              ? 'Support our community with your contribution' 
              : `Complete your payment for ${itemDetails?.title || 'this item'}`}
          </p>
        </div>
        
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          {/* Item details section */}
          {itemDetails && (
            <div className="border-b border-gray-700 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{itemDetails.title}</h2>
                  {itemDetails.date && (
                    <p className="text-gray-400 mt-1">
                      {format(new Date(itemDetails.date), 'MMMM d, yyyy')}
                    </p>
                  )}
                  {itemDetails.description && (
                    <p className="text-gray-400 mt-2 line-clamp-2">{itemDetails.description}</p>
                  )}
                </div>
                
                {(itemDetails.ticketPrice || itemDetails.price) && (
                  <div className="mt-4 md:mt-0">
                    <span className="text-2xl font-bold text-amber-500">
                      ${(itemDetails.ticketPrice || itemDetails.price).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Payment form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-400">
                Amount {type === 'donation' ? '' : '(USD)'}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  min="1"
                  step="0.01"
                  required
                  value={paymentData.amount}
                  onChange={handleChange}
                  className="block w-full pl-7 pr-12 py-3 border-gray-700 bg-gray-700 text-white rounded-md focus:ring-amber-500 focus:border-amber-500"
                  placeholder="0.00"
                  disabled={type !== 'donation' && (itemDetails?.ticketPrice || itemDetails?.price)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">USD</span>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-400">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentData.paymentMethod}
                onChange={handleChange}
                className="mt-1 block w-full py-3 px-4 border-gray-700 bg-gray-700 text-white rounded-md focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
            
            {paymentData.paymentMethod === 'credit_card' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-400">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    required
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full py-3 px-4 border-gray-700 bg-gray-700 text-white rounded-md focus:ring-amber-500 focus:border-amber-500"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-400">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    id="cardName"
                    required
                    value={paymentData.cardName}
                    onChange={handleChange}
                    className="mt-1 block w-full py-3 px-4 border-gray-700 bg-gray-700 text-white rounded-md focus:ring-amber-500 focus:border-amber-500"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-400">
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      id="expiryDate"
                      required
                      value={paymentData.expiryDate}
                      onChange={handleChange}
                      className="mt-1 block w-full py-3 px-4 border-gray-700 bg-gray-700 text-white rounded-md focus:ring-amber-500 focus:border-amber-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-400">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      id="cvv"
                      required
                      value={paymentData.cvv}
                      onChange={handleChange}
                      className="mt-1 block w-full py-3 px-4 border-gray-700 bg-gray-700 text-white rounded-md focus:ring-amber-500 focus:border-amber-500"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {paymentData.paymentMethod === 'paypal' && (
              <div className="bg-gray-750 p-4 rounded-md border border-gray-700">
                <p className="text-gray-300">
                  You will be redirected to PayPal to complete your payment after clicking the button below.
                </p>
              </div>
            )}
            
            {paymentData.paymentMethod === 'bank_transfer' && (
              <div className="bg-gray-750 p-4 rounded-md border border-gray-700">
                <p className="text-gray-300 mb-2">
                  Please use the following details for bank transfer:
                </p>
                <div className="space-y-1 text-sm text-gray-400">
                  <p><span className="font-medium">Bank Name:</span> Alumni Association Bank</p>
                  <p><span className="font-medium">Account Name:</span> University Alumni Association</p>
                  <p><span className="font-medium">Account Number:</span> 1234567890</p>
                  <p><span className="font-medium">Routing Number:</span> 987654321</p>
                  <p><span className="font-medium">Reference:</span> {user?.id || 'Your Name'} - {type.toUpperCase()}</p>
                </div>
                <p className="mt-2 text-amber-500 text-sm">
                  Please note that your payment will be manually verified after the transfer is complete.
                </p>
              </div>
            )}
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-400">
                Additional Notes (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={paymentData.description}
                onChange={handleChange}
                className="mt-1 block w-full py-3 px-4 border-gray-700 bg-gray-700 text-white rounded-md focus:ring-amber-500 focus:border-amber-500"
                placeholder="Any special instructions or notes..."
              ></textarea>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={processingPayment}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processingPayment ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Pay $${parseFloat(paymentData.amount || 0).toFixed(2)}`
                )}
              </button>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <p>
                By proceeding with this payment, you agree to our{' '}
                <a href="/terms" className="text-amber-500 hover:text-amber-400">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-amber-500 hover:text-amber-400">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 