import React, { useState, useEffect } from 'react';
import { alumniAPI } from '../../services/api';
import { toast } from 'react-toastify';

const AlumniDonations = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('campaigns');
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  useEffect(() => {
    if (activeTab === 'campaigns') {
      fetchCampaigns();
    } else if (activeTab === 'history') {
      fetchDonations();
    }
  }, [activeTab]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await alumniAPI.getDonationCampaigns();
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching donation campaigns:', error);
      toast.error('Failed to load donation campaigns');
    } finally {
      setLoading(false);
    }
  };

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await alumniAPI.getUserDonations();
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donation history:', error);
      toast.error('Failed to load donation history');
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDonateModal(true);
  };

  const handleSubmitDonation = async (e) => {
    e.preventDefault();
    try {
      const donationData = {
        campaignId: selectedCampaign._id,
        amount: parseFloat(donationAmount),
        paymentMethod,
        isAnonymous,
        paymentDetails
      };
      
      await alumniAPI.makeDonation(donationData);
      toast.success('Donation processed successfully! Thank you for your support.');
      setShowDonateModal(false);
      
      // Reset form
      setDonationAmount('');
      setPaymentMethod('credit_card');
      setIsAnonymous(false);
      setPaymentDetails({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
      });
      
      // If we're on the history tab, refresh donations
      if (activeTab === 'history') {
        fetchDonations();
      }
    } catch (error) {
      console.error('Error processing donation:', error);
      toast.error('Failed to process donation');
    }
  };

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value
    });
  };

  // Calculate campaign progress
  const calculateProgress = (campaign) => {
    if (!campaign.goal) return 100; // No goal means we show full progress
    const progress = (campaign.raised / campaign.goal) * 100;
    return Math.min(progress, 100); // Cap at 100%
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Alumni Giving</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'campaigns' 
                ? 'text-amber-500 border-b-2 border-amber-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Current Campaigns
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'history' 
                ? 'text-amber-500 border-b-2 border-amber-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Donations
          </button>
          <button
            onClick={() => setActiveTab('impact')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'impact' 
                ? 'text-amber-500 border-b-2 border-amber-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Impact Report
          </button>
        </div>
        
        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div>
            {loading ? (
              <div className="animate-pulse space-y-6">
                {Array(3).fill().map((_, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6">
                    <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                    <div className="h-2 bg-gray-700 rounded mb-4"></div>
                    <div className="h-8 bg-gray-700 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {campaigns.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {campaigns.map(campaign => (
                      <div key={campaign._id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                        {campaign.image && (
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={campaign.image} 
                              alt={campaign.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-medium text-white mb-2">{campaign.title}</h3>
                          <p className="text-gray-300 mb-4">{campaign.description}</p>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{formatCurrency(campaign.raised)} raised</span>
                              {campaign.goal && (
                                <span>Goal: {formatCurrency(campaign.goal)}</span>
                              )}
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                              <div 
                                className="bg-amber-600 h-2.5 rounded-full" 
                                style={{ width: `${calculateProgress(campaign)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">
                              {campaign.donors} {campaign.donors === 1 ? 'donor' : 'donors'}
                            </span>
                            <button
                              onClick={() => handleDonate(campaign)}
                              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                            >
                              Donate Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-800 rounded-lg p-8 text-center">
                    <p className="text-gray-400">No active donation campaigns at the moment.</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        
        {/* My Donations Tab */}
        {activeTab === 'history' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Donation History</h2>
            
            {donations.length > 0 ? (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Campaign
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Receipt
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {donations.map(donation => (
                      <tr key={donation._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(donation.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {donation.campaign.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-500 font-medium">
                          {formatCurrency(donation.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            donation.status === 'Completed' 
                              ? 'bg-green-900 text-green-200' 
                              : 'bg-yellow-900 text-yellow-200'
                          }`}>
                            {donation.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {donation.status === 'Completed' && (
                            <button className="text-blue-400 hover:text-blue-300">
                              <i className="fas fa-download mr-1"></i> Download
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">You haven't made any donations yet.</p>
                <button 
                  onClick={() => setActiveTab('campaigns')}
                  className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                >
                  View Campaigns
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Impact Report Tab */}
        {activeTab === 'impact' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-amber-900 to-amber-700 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">
                  {donations.length > 0 ? formatCurrency(donations.reduce((sum, donation) => sum + donation.amount, 0)) : '$0'}
                </div>
                <p className="text-amber-200">Total Donated</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">
                  {donations.length}
                </div>
                <p className="text-blue-200">Donations Made</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold mb-2">
                  {new Set(donations.map(d => d.campaign._id)).size}
                </div>
                <p className="text-green-200">Campaigns Supported</p>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-medium mb-4">Impact Breakdown</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Scholarships</h4>
                  <p className="text-gray-300 mb-2">Your donations have helped fund scholarships for 5 students this year.</p>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>45% of your donations</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Campus Improvements</h4>
                  <p className="text-gray-300 mb-2">Your support has contributed to renovations of the student center.</p>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>30% of your donations</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Research Initiatives</h4>
                  <p className="text-gray-300 mb-2">Your generosity has supported 2 faculty research projects.</p>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>25% of your donations</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">Thank You Messages</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-300 italic mb-2">
                    "Your generous donation has allowed me to continue my education without financial worry. 
                    I'm the first in my family to attend college, and your support means the world to me."
                  </p>
                  <p className="text-right text-sm text-amber-500">- Maria S., Scholarship Recipient</p>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-300 italic mb-2">
                    "Thanks to alumni like you, our research team was able to purchase the equipment 
                    needed to advance our work in renewable energy. Your impact extends far beyond campus."
                  </p>
                  <p className="text-right text-sm text-amber-500">- Dr. James L., Research Faculty</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Donation Modal */}
        {showDonateModal && selectedCampaign && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Donate to {selectedCampaign.title}</h2>
                  <button 
                    onClick={() => setShowDonateModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                
                <form onSubmit={handleSubmitDonation}>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Donation Amount*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">$</span>
                      </div>
                      <input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        required
                        min="1"
                        step="1"
                        className="w-full pl-8 px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Payment Method*</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="credit_card">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank_transfer">Bank Transfer</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={paymentDetails.cardNumber}
                      onChange={handlePaymentDetailsChange}
                      name="cardNumber"
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={paymentDetails.expiryDate}
                      onChange={handlePaymentDetailsChange}
                      name="expiryDate"
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-1">CVV</label>
                    <input
                      type="text"
                      value={paymentDetails.cvv}
                      onChange={handlePaymentDetailsChange}
                      name="cvv"
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-1">Name on Card</label>
                    <input
                      type="text"
                      value={paymentDetails.nameOnCard}
                      onChange={handlePaymentDetailsChange}
                      name="nameOnCard"
                      required
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-600 rounded"
                      />
                      <span className="ml-2 text-gray-300">Make my donation anonymous</span>
                    </label>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowDonateModal(false)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-md mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md"
                    >
                      Complete Donation
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDonations; 