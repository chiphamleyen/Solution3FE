import React from 'react';
import './Shared.css';

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-between align-items-center py-3 border-bottom">
      <div className="logo">
        <h1 className="text-purple fw-bold m-0">MalwareShield</h1>
      </div>
      
      <nav>
        <ul className="nav">
          <li className="nav-item"><a href="#" className="nav-link active fw-semibold">Dashboard</a></li>
          <li className="nav-item"><a href="#" className="nav-link">History</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Reports</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Settings</a></li>
        </ul>
      </nav>
      
      <div className="user-profile d-flex align-items-center">
        <img 
          src="../../logo.svg" 
          alt="User" 
          className="rounded-circle me-2" 
          width="40" 
          height="40" 
        />
        <span className="text-muted">Welcome, User</span>
        <button className="btn btn-outline-secondary ms-3">
            <a href="/login" className="text-decoration-none text-muted">Logout</a>
        </button>
      </div>
    </header>
  );
};

export default Header;
