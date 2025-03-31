import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import UserManagement from '../../components/admin/UserManagement';

const AdminUsers = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">User Management</h1>
        </div>
        
        <UserManagement />
      </div>
    </AdminLayout>
  );
};

export default AdminUsers; 