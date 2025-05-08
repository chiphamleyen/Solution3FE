import React from 'react';
import Navbar from '../Shared/Navbar';
import Sidebar from '../Shared/Sidebar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Sample analytics data
  const analyticsData = [
    { name: 'Total Scans', value: 1243 },
    { name: 'Malicious Files', value: 87 },
    { name: 'Users', value: 56 },
    { name: 'System Health', value: '98%' }
  ];

  return (
    <div className="admin-container">
      <Navbar isAdmin={true} />
      <div className="admin-content">
        <Sidebar isAdmin={true} />
        <main>
          <h1>Admin Dashboard</h1>
          <div className="admin-stats">
            {analyticsData.map((item, index) => (
              <div key={index} className="stat-card">
                <h3>{item.name}</h3>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
          
          <div className="admin-section">
            <h2>Recent Scans</h2>
            {/* Add scan history table here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;