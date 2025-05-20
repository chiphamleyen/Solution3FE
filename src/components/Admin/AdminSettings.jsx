import React, { useEffect, useState } from 'react';
import Header from '../Shared/Header';
import axiosAdmin from '../../api/axiosAdmin';
import { API_PATHS_ADMIN } from '../../api/config';

const AdminSettings = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ user_name: '', email: '' });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);

  // State cho tạo admin mới
  const [showCreate, setShowCreate] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ user_name: '', email: '', password: '' });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [createSuccess, setCreateSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosAdmin.get(API_PATHS_ADMIN.USER_MANAGEMENT_GET_USER + '/me');
        if (response.data.error_code === 0) {
          setAdmin(response.data.data);
          setForm({
            user_name: response.data.data.user_name || response.data.data.name || '',
            email: response.data.data.email || ''
          });
        } else {
          setError(response.data.message || 'Failed to fetch admin info');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch admin info');
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
      user_name: admin.user_name || admin.name || '',
      email: admin.email || ''
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
      const response = await axiosAdmin.post(API_PATHS_ADMIN.USER_MANAGEMENT_UPDATE_USER + '/me', {
        user_name: form.user_name,
        email: form.email
      });
      if (response.data.error_code === 0) {
        setAdmin({ ...admin, user_name: form.user_name, email: form.email });
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

  // Tạo admin mới
  const handleCreateChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleCreateAdmin = async () => {
    setCreating(true);
    setCreateError(null);
    setCreateSuccess(null);
    try {
      const response = await axiosAdmin.post(API_PATHS_ADMIN.USER_MANAGEMENT_CREATE_ADMIN, newAdmin);
      if (response.data.error_code === 0) {
        setCreateSuccess('New admin created successfully!');
        setNewAdmin({ user_name: '', email: '', password: '' });
      } else {
        setCreateError(response.data.message || 'Failed to create admin');
      }
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Failed to create admin');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container-fluid" style={{ maxWidth: '90%', padding: '20px' }}>
      <Header isAdmin={true} />
      <div className="row mt-4">
        <div className="col-12">
          <section className="card shadow-sm p-4 mb-4">
            <h2 className="h4 fw-bold mb-3">Admin Settings</h2>
            {loading && <div>Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            {admin && (
              <div className="row g-4 align-items-center">
                <div className="col-auto">
                  <img src="/assets/profile.png" alt="Admin" width={80} height={80} className="rounded-circle border" />
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
                      admin.user_name || admin.name
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
                      admin.email
                    )}
                  </div>
                  <div className="mb-2"><strong>Role:</strong> {admin.role || 'Admin'}</div>
                  <div className="mb-2"><strong>Created At:</strong> {admin.created_at ? new Date(admin.created_at).toLocaleString() : ''}</div>
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

          <section className="card shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="h5 fw-bold mb-0">Create New Admin</h3>
              <button className="btn btn-outline-primary" onClick={() => setShowCreate(!showCreate)}>
                {showCreate ? 'Close' : 'Create New Admin'}
              </button>
            </div>
            {showCreate && (
              <form onSubmit={e => { e.preventDefault(); handleCreateAdmin(); }}>
                <div className="row g-3 align-items-center">
                  <div className="col-md-4">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="user_name"
                      value={newAdmin.user_name}
                      onChange={handleCreateChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newAdmin.email}
                      onChange={handleCreateChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={newAdmin.password}
                      onChange={handleCreateChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <button className="btn btn-success me-2" type="submit" disabled={creating}>
                    {creating ? 'Creating...' : 'Create'}
                  </button>
                  <button className="btn btn-secondary" type="button" onClick={() => setShowCreate(false)} disabled={creating}>
                    Cancel
                  </button>
                </div>
                {createError && <div className="alert alert-danger mt-2">{createError}</div>}
                {createSuccess && <div className="alert alert-success mt-2">{createSuccess}</div>}
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings; 