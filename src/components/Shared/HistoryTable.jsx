import React, { useState, useEffect } from 'react';
import { API_PATHS_ADMIN, API_PATHS_USER } from '../../api/config';
import axiosAdmin from '../../api/axiosAdmin';
import axiosUser from '../../api/axiosUser';

const HistoryTable = ({ isAdmin = false }) => {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDefaultDateRange = () => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 6);
    return {
      min_date: formatDate(lastWeek),
      max_date: formatDate(today)
    };
  };

  const [filters, setFilters] = useState({
    ...getDefaultDateRange(),
    page: 1,
    size: 10,
    classifier: 'all'
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classifiers, setClassifiers] = useState(['all']);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const axiosInstance = isAdmin ? axiosAdmin : axiosUser;
      const apiPath = isAdmin ? API_PATHS_ADMIN.HISTORY : API_PATHS_USER.HISTORY;
      
      // Ensure we have valid dates
      const params = {
        min_date: filters.min_date || formatDate(new Date(new Date().setDate(new Date().getDate() - 6))),
        max_date: filters.max_date || formatDate(new Date()),
        page: filters.page,
        size: filters.size
      };

      // Only add classifier if it's not 'all'
      if (filters.classifier !== 'all') {
        params.classifier = filters.classifier;
      }

      const response = await axiosInstance.get(apiPath, { params });

      if (response.data.error_code === 0) {
        setData(response.data);
        // Update classifiers list if needed
        const uniqueClassifiers = [...new Set(response.data.items.map(item => item.classifier))];
        setClassifiers(['all', ...uniqueClassifiers]);
      } else {
        setError(response.data.message || 'Failed to fetch history data');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch history data');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(data.total / filters.size);
    const currentPage = filters.page;
    const pageNumbers = [];
    const delta = 2; // số trang lân cận

    // Luôn hiển thị trang đầu
    if (totalPages <= 1) return null;
    pageNumbers.push(1);

    // Hiển thị ... nếu cần
    if (currentPage - delta > 2) {
      pageNumbers.push('prev-ellipsis');
    }

    // Hiển thị các trang lân cận
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      pageNumbers.push(i);
    }

    // Hiển thị ... nếu cần
    if (currentPage + delta < totalPages - 1) {
      pageNumbers.push('next-ellipsis');
    }

    // Luôn hiển thị trang cuối nếu > 1
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return (
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((page, idx) => {
          if (page === 'prev-ellipsis' || page === 'next-ellipsis') {
            return <li key={page + idx} className="page-item disabled"><span className="page-link">...</span></li>;
          }
          return (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
                disabled={currentPage === page}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    );
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!data) {
    return <div className="text-center p-4">No data available</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        {/* Filters */}
        <div className="row mb-4">
          <div className="col-md-3">
            <label className="form-label">From Date</label>
            <input
              type="date"
              className="form-control"
              name="min_date"
              value={filters.min_date}
              onChange={handleFilterChange}
              max={filters.max_date}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">To Date</label>
            <input
              type="date"
              className="form-control"
              name="max_date"
              value={filters.max_date}
              onChange={handleFilterChange}
              min={filters.min_date}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Classifier</label>
            <select
              className="form-select"
              name="classifier"
              value={filters.classifier}
              onChange={handleFilterChange}
            >
              {classifiers.map((classifier, index) => (
                <option key={index} value={classifier}>
                  {classifier}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Items per page</label>
            <select
              className="form-select"
              name="size"
              value={filters.size}
              onChange={handleFilterChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>SHA-256 Hash</th>
                <th>Status</th>
                <th>Classification</th>
                <th>Analysis Date</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item._id}>
                  <td className="text-monospace small">{item.sha_256_hash}</td>
                  <td>
                    <span className={`badge ${item.detection ? 'bg-danger' : 'bg-success'}`}>
                      {item.detection ? 'Malicious' : 'Benign'}
                    </span>
                  </td>
                  <td>{item.classifier}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation" className="mt-4">
          {renderPagination()}
        </nav>

        <div className="mt-3 text-muted small text-center">
          Showing {((filters.page - 1) * filters.size) + 1} to {Math.min(filters.page * filters.size, data.total)} of {data.total} results
        </div>
      </div>
    </div>
  );
};

export default HistoryTable; 