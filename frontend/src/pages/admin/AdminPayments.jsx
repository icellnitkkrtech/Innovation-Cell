import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import PaymentManagement from '../../components/admin/PaymentManagement';

const AdminPayments = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Payment Management</h1>
        </div>
        
        <PaymentManagement />
      </div>
    </AdminLayout>
  );
};

export default AdminPayments; 