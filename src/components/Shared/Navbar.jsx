import React from 'react';

const Navbar = ({ isAdmin }) => {
  return (
    <header className="navbar">
      <div className="logo">
        <h1>MalwareShield {isAdmin ? '(Admin)' : ''}</h1>
      </div>
      <div className="user-profile">
        <img src="https://via.placeholder.com/40" alt="User" />
        <span>Welcome, {isAdmin ? 'Admin' : 'User'}</span>
      </div>
    </header>
  );
};

export default Navbar;