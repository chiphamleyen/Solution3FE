import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Shared.css';

const Header = ({ isAdmin = false }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => {
    return currentPath === path;
  };

  return (
    <header className="d-flex flex-wrap justify-content-between align-items-center py-3 border-bottom">
      <div className="logo">
        <h1 className="text-purple fw-bold m-0">MalwareShield</h1>
      </div>
      
      <nav>
        <ul className="nav">
          {isAdmin ? (
            <>
              <li className="nav-item">
                <Link 
                  to="/admin/dashboard" 
                  className={`nav-link ${isActive('/admin/dashboard') ? 'active fw-semibold' : ''}`}
                >
                  Dashboard
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link 
                  to="/admin/user-management" 
                  className={`nav-link ${isActive('/admin/user-management') ? 'active fw-semibold' : ''}`}
                >
                  User Management
                </Link>
              </li> */}
              <li className="nav-item">
                <Link 
                  to="/admin/history" 
                  className={`nav-link ${isActive('/admin/history') ? 'active fw-semibold' : ''}`}
                >
                  History
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link 
                  to="/user/analysis" 
                  className={`nav-link ${isActive('/user/analysis') ? 'active fw-semibold' : ''}`}
                >
                  Analysis
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/user/history" 
                  className={`nav-link ${isActive('/user/history') ? 'active fw-semibold' : ''}`}
                >
                  History
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link 
              to={isAdmin ? "/admin/settings" : "/user/settings"} 
              className={`nav-link ${isActive(isAdmin ? '/admin/settings' : '/user/settings') ? 'active fw-semibold' : ''}`}
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="user-profile d-flex align-items-center">
        <img 
          src="/assets/profile.png" 
          alt={isAdmin ? "Admin" : "User"} 
          className="rounded-circle me-2" 
          width="40" 
          height="40" 
        />
        <span className="text-muted">Welcome, {isAdmin ? 'Admin' : 'User'}</span>
        <button className="btn btn-outline-secondary ms-3">
          <Link 
            to={isAdmin ? "/admin/login" : "/user/login"} 
            className="text-decoration-none text-muted"
          >
            Logout
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
