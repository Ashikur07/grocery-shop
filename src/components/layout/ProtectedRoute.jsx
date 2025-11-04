import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

const ProtectedRoute = () => {
  if (isAuthenticated()) {
    return <Outlet />; // ইউজার লগইন করা আছে, তাকে ড্যাশবোর্ডে যেতে দিন
  }
  
  // ইউজার লগইন করা নেই, তাকে লগইন পেজে পাঠিয়ে দিন
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;