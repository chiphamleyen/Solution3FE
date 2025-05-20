import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosUser from '../../api/axiosUser';
import { API_PATHS_USER } from '../../api/config';
import './Login.css';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axiosUser.post(API_PATHS_USER.LOGIN, {
        email,
        password
      });

      const { access_token } = response.data.data;
      
      // Store token in localStorage
      localStorage.setItem('userToken', access_token);
      
      // Decode JWT token to get user role
      const tokenPayload = JSON.parse(atob(access_token.split('.')[1]));
      const userRole = tokenPayload.sub;

      if (userRole === 'user') {
        navigate('/user/analysis');
      } else {
        setError('Invalid user account.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-box">
        <h1>User Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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
            <button type="submit">Login</button>
          </div>
          <div className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
          <div className="switch-login">
            <span>Are you an admin? </span>
            <Link to="/admin/login">Switch to Admin Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin; 