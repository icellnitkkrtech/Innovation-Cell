import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import EventManagement from '../../components/admin/EventManagement';

const AdminEvents = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Event Management</h1>
        </div>
        
        <EventManagement />
      </div>
    </AdminLayout>
  );
};

export default AdminEvents; 