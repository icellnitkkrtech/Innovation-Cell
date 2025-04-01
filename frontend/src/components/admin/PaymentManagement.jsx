import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { adminAPI } from '../../services/api';
import { format } from 'date-fns';

const PaymentManagement = ({ recentPayments = null }) => {
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(recentPayments === null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState({
    user: '',
    amount: '',
    currency: 'USD',
    paymentMethod: 'credit_card',
    status: 'pending',
    description: '',
    paymentDate: '',
    relatedTo: 'other',
    receiptUrl: ''
  });

  useEffect(() => {
    if (recentPayments) {
      setPayments(recentPayments);
      setLoading(false);
    } else {
      fetchPayments();
    }
    fetchUsers();
  }, [recentPayments]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await adminAPI.getAllPayments();
      console.log('Fetched payments:', res.data);
      setPayments(res.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await adminAPI.getAllUsers();
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    }
  };

  const handleAddPayment = () => {
    setFormData({
      user: '',
      amount: '',
      currency: 'USD',
      paymentMethod: 'credit_card',
      status: 'pending',
      description: '',
      paymentDate: format(new Date(), 'yyyy-MM-dd'),
      relatedTo: 'other',
      receiptUrl: ''
    });
    setShowAddModal(true);
  };

  const handleEditPayment = (payment) => {
    setSelectedPayment(payment);
    setFormData({
      user: payment.user._id,
      amount: payment.amount,
      currency: payment.currency,
      paymentMethod: payment.paymentMethod,
      status: payment.status,
      description: payment.description || '',
      paymentDate: payment.paymentDate ? format(new Date(payment.paymentDate), 'yyyy-MM-dd') : '',
      relatedTo: payment.relatedTo,
      receiptUrl: payment.receiptUrl || ''
    });
    setShowEditModal(true);
  };

  const handleDeletePayment = async (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await adminAPI.deletePayment(paymentId);
        toast.success('Payment deleted successfully');
        fetchPayments();
      } catch (error) {
        console.error('Error deleting payment:', error);
        toast.error('Failed to delete payment');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (showAddModal) {
        await adminAPI.createPayment(formData);
        toast.success('Payment created successfully');
      } else {
        await adminAPI.updatePayment(selectedPayment._id, formData);
        toast.success('Payment updated successfully');
      }
      
      setShowAddModal(false);
      setShowEditModal(false);
      fetchPayments();
    } catch (error) {
      console.error('Error saving payment:', error);
      toast.error('Failed to save payment');
    } finally {
      setLoading(false);
    }
  };

  // Filter payments based on search term and status filter
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-600';
      case 'completed':
        return 'bg-green-600';
      case 'failed':
        return 'bg-red-600';
      case 'refunded':
        return 'bg-purple-600';
      default:
        return 'bg-gray-600';
    }
  };

  // Format currency
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="bg-gray-700 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-bold text-white">
          {recentPayments ? 'Recent Payments' : 'Payment Management'}
        </h2>
        
        {!recentPayments && (
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <button
              onClick={handleAddPayment}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-md hover:from-amber-600 hover:to-orange-600 transition-colors"
            >
              Add Payment
            </button>
            <button
              onClick={fetchPayments}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
            >
              Refresh
            </button>
          </div>
        )}
      </div>
      
      {!recentPayments && (
        <div className="p-4 bg-gray-750 border-b border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No payments found. {!recentPayments && 'Create your first payment by clicking "Add Payment".'}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPayments.map(payment => (
              <div 
                key={payment._id}
                className="bg-gray-750 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between border border-gray-700 hover:border-amber-500 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-white truncate">
                      {payment.user?.name || 'Unknown User'}
                    </h3>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mt-1">
                    {payment.user?.email || 'No email'}
                  </p>
                  
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-amber-500 font-semibold">
                      {formatCurrency(payment.amount, payment.currency)}
                    </span>
                    <span className="text-gray-400">
                      via {payment.paymentMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    <span className="text-gray-400">
                      on {format(new Date(payment.paymentDate), 'MMM d, yyyy')}
                    </span>
                  </div>
                  
                  {payment.description && (
                    <p className="text-gray-400 mt-2 truncate">
                      {payment.description}
                    </p>
                  )}
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center space-x-2">
                  <button
                    onClick={() => handleEditPayment(payment)}
                    className="px-3 py-1 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePayment(payment._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            
            {!recentPayments && filteredPayments.length > 0 && (
              <div className="mt-4 text-center text-gray-400">
                Showing {filteredPayments.length} of {payments.length} payments
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Add/Edit Payment Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-white">
                        {showAddModal ? 'Add New Payment' : 'Edit Payment'}
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="user" className="block text-sm font-medium text-gray-400">
                            User
                          </label>
                          <select
                            id="user"
                            name="user"
                            required
                            value={formData.user}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          >
                            <option value="">Select User</option>
                            {users.map(user => (
                              <option key={user._id} value={user._id}>
                                {user.name} ({user.email})
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-400">
                              Amount
                            </label>
                            <input
                              type="number"
                              name="amount"
                              id="amount"
                              required
                              min="0"
                              step="0.01"
                              value={formData.amount}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="currency" className="block text-sm font-medium text-gray-400">
                              Currency
                            </label>
                            <select
                              id="currency"
                              name="currency"
                              value={formData.currency}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                            >
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                              <option value="CAD">CAD</option>
                              <option value="AUD">AUD</option>
                              <option value="JPY">JPY</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-400">
                              Payment Method
                            </label>
                            <select
                              id="paymentMethod"
                              name="paymentMethod"
                              value={formData.paymentMethod}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                            >
                              <option value="credit_card">Credit Card</option>
                              <option value="paypal">PayPal</option>
                              <option value="bank_transfer">Bank Transfer</option>
                              <option value="cash">Cash</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-400">
                              Status
                            </label>
                            <select
                              id="status"
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="completed">Completed</option>
                              <option value="failed">Failed</option>
                              <option value="refunded">Refunded</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-400">
                            Payment Date
                          </label>
                          <input
                            type="date"
                            name="paymentDate"
                            id="paymentDate"
                            required
                            value={formData.paymentDate}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="relatedTo" className="block text-sm font-medium text-gray-400">
                            Related To
                          </label>
                          <select
                            id="relatedTo"
                            name="relatedTo"
                            value={formData.relatedTo}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          >
                            <option value="event">Event</option>
                            <option value="donation">Donation</option>
                            <option value="membership">Membership</option>
                            <option value="project">Project</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-400">
                            Description
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            rows="2"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          ></textarea>
                        </div>
                        
                        <div>
                          <label htmlFor="receiptUrl" className="block text-sm font-medium text-gray-400">
                            Receipt URL
                          </label>
                          <input
                            type="url"
                            name="receiptUrl"
                            id="receiptUrl"
                            value={formData.receiptUrl}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white focus:ring-amber-500 focus:border-amber-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-base font-medium text-white hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {showAddModal ? 'Create Payment' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PaymentManagement;