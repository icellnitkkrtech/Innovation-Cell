import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProjectManagement from '../../components/admin/ProjectManagement';

const AdminProjects = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Project Management</h1>
        </div>
        
        <ProjectManagement />
      </div>
    </AdminLayout>
  );
};

export default AdminProjects; 