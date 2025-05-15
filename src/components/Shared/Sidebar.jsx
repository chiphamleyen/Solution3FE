import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isAdmin }) => {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to={isAdmin ? "/admin" : "/dashboard"}>Dashboard</Link></li>
        {isAdmin && (
          <>
            <li><Link to="/admin/users">User Management</Link></li>
            <li><Link to="/admin/reports">System Reports</Link></li>
          </>
        )}
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;