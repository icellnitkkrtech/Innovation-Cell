import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Remove any import of BrowserRouter, Router, etc. from here

const DashboardLayout = ({ children }) => {
  // Your layout logic here
  
  return (
    // Make sure there's no Router component here
    <div className="min-h-screen bg-gray-900">
      {/* Your layout structure */}
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout; 