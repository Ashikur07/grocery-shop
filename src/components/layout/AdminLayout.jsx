import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet /> {/* এখানে আমাদের পেজগুলো রেন্ডার হবে */}
      </main>
    </div>
  );
};

export default AdminLayout;