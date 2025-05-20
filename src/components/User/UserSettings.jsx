import React, { useEffect, useState } from 'react';
import Header from '../Shared/Header';
import axiosUser from '../../api/axiosUser';
import { API_PATHS } from '../../api/config';

const UserSettings = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ user_name: '', email: '' });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosUser.get(API_PATHS.PROFILE);
        if (response.data.error_code === 0) {
          setUser(response.data.data);
          setForm({
            user_name: response.data.data.user_name || response.data.data.name || '',
            email: response.data.data.email || ''
          });
        } else {
          setError(response.data.message || 'Failed to fetch user info');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user info');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditMode(true);
    setSuccess(null);
    setError(null);
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm({
      user_name: user.user_name || user.name || '',
      email: user.email || ''
    });
    setSuccess(null);
    setError(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axiosUser.post(API_PATHS.UPDATE_PROFILE, {
        user_name: form.user_name,
        email: form.email
      });
      if (response.data.error_code === 0) {
        setUser({ ...user, user_name: form.user_name, email: form.email });
        setEditMode(false);
        setSuccess('Profile updated successfully!');
      } else {
        setError(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-fluid" style={{ maxWidth: '90%', padding: '20px' }}>
      <Header isAdmin={false} />
      <div className="row mt-4">
        <div className="col-12">
          <section className="card shadow-sm p-4">
            <h2 className="h4 fw-bold mb-3">User Settings</h2>
            {loading && <div>Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            {user && (
              <div className="row g-4 align-items-center">
                <div className="col-auto">
                  <img src="/assets/profile.png" alt="User" width={80} height={80} className="rounded-circle border" />
                </div>
                <div className="col">
                  <div className="mb-2">
                    <strong>Name:</strong>{' '}
                    {editMode ? (
                      <input
                        type="text"
                        name="user_name"
                        value={form.user_name}
                        onChange={handleChange}
                        className="form-control d-inline-block w-auto ms-2"
                        style={{ maxWidth: 250 }}
                        disabled={saving}
                      />
                    ) : (
                      user.user_name || user.name
                    )}
                  </div>
                  <div className="mb-2">
                    <strong>Email:</strong>{' '}
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-control d-inline-block w-auto ms-2"
                        style={{ maxWidth: 250 }}
                        disabled={saving}
                      />
                    ) : (
                      user.email
                    )}
                  </div>
                  <div className="mb-2"><strong>Role:</strong> {user.role || 'User'}</div>
                  <div className="mb-2"><strong>Created At:</strong> {user.created_at ? new Date(user.created_at).toLocaleString() : ''}</div>
                  <div className="mt-3">
                    {editMode ? (
                      <>
                        <button className="btn btn-success me-2" onClick={handleSave} disabled={saving}>
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                        <button className="btn btn-secondary" onClick={handleCancel} disabled={saving}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-primary" onClick={handleEdit}>
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserSettings; 