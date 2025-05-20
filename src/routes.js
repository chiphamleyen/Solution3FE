import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserDashboard from './components/User/UserDashboard';
import UserLogin from './components/Auth/UserLogin';
import AdminLogin from './components/Auth/AdminLogin';
import UserHistory from './components/User/UserHistory';
import AdminHistory from './components/Admin/AdminHistory';
import UserSettings from './components/User/UserSettings';
import AdminSettings from './components/Admin/AdminSettings';
import MalwarePrevention from './components/User/MalwarePrevention';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<UserLogin />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/history" element={<AdminHistory />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/user/analysis" element={<UserDashboard />} />
      <Route path="/user/history" element={<UserHistory />} />
      <Route path="/user/settings" element={<UserSettings />} />
      <Route path="/user/prevention" element={<MalwarePrevention />} />
    </Routes>
  );
};

export default AppRoutes;