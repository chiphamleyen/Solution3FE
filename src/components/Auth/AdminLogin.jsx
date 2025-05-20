import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosAdmin from '../../api/axiosAdmin';
import { API_PATHS_ADMIN } from '../../api/config';
import './Login.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axiosAdmin.post(API_PATHS_ADMIN.LOGIN, {
        email,
        password
      });

      const { access_token } = response.data.data;
      
      // Store token in localStorage
      localStorage.setItem('adminToken', access_token);
      
      // Decode JWT token to get user role
      const tokenPayload = JSON.parse(atob(access_token.split('.')[1]));
      const userRole = tokenPayload.sub;

      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setError('Access denied. Admin privileges required.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-box">
        <h1>Admin Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="forgot-link">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <div className="btn-field">
            <button type="submit">Login as Admin</button>
          </div>
          <div className="switch-login">
            <span>Are you a regular user? </span>
            <Link to="/user/login">Switch to User Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 