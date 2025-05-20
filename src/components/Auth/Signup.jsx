import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosUser from '../../api/axiosUser';
import { API_PATHS_USER } from '../../api/config';
import './Login.css'; // Reusing login styles

const Signup = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axiosUser.post(API_PATHS_USER.REGISTER, {
        user_name: formData.user_name,
        email: formData.email,
        password: formData.password
      });

      if (response.data.error_code === 0) {
        // Registration successful, navigate to login
        navigate('/user/login');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-box">
        <h1>Create Account</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-field">
              <label htmlFor="user_name">Username</label>
              <input
                type="text"
                id="user_name"
                placeholder="Enter your username"
                value={formData.user_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="btn-field">
            <button type="submit">Sign Up</button>
          </div>
          <div className="login-link">
            Already have an account? <a href="/user/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;