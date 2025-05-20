import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import axiosAdmin from '../../api/axiosAdmin';
import { API_PATHS_ADMIN } from '../../api/config';
import './AdminDashboard.css';
import Header from '../Shared/Header';

const COLORS = ['#6c63ff', '#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff', '#ff9f40'];

const AdminDashboard = () => {
  const getDefaultDateRange = () => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 6);
    return {
      min_date: formatDate(lastWeek),
      max_date: formatDate(today)
    };
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [filters, setFilters] = useState({
    ...getDefaultDateRange(),
    dateRange: 'week'
  });
  const [dashboardData, setDashboardData] = useState({
    total: 0,
    detection_benign: 0,
    detection_malware: 0,
    classifier: []
  });
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      await fetchDashboardData();
      await fetchDailyData();
    };
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleDateRangeChange = (range) => {
    const today = new Date();
    let minDate = new Date();
    let maxDate = new Date();

    switch (range) {
      case 'week':
        minDate.setDate(today.getDate() - 6);
        break;
      case 'month':
        minDate.setMonth(today.getMonth() - 1);
        break;
      default:
        return;
    }

    setFilters({
      ...filters,
      dateRange: range,
      min_date: formatDate(minDate),
      max_date: formatDate(maxDate)
    });
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axiosAdmin.get(
        `${API_PATHS_ADMIN.REPORT}?min_date=${filters.min_date}&max_date=${filters.max_date}`
      );

      if (response.data.error_code === 0) {
        setDashboardData(response.data.data);
        console.log(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyData = async () => {
    try {
      const today = new Date();
      const promises = [];

      // Create 7 API calls for the last 7 days including today
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = formatDate(date);
        
        // Set max_date to next day to include current day's data
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        const nextDayStr = formatDate(nextDay);
        
        console.log('Fetching data for:', dateStr, 'to', nextDayStr);
        
        promises.push(
          axiosAdmin.get(`${API_PATHS_ADMIN.REPORT}?min_date=${dateStr}&max_date=${nextDayStr}`)
        );
      }

      const responses = await Promise.all(promises);
      const dailyStats = responses.map((response, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - index));
        console.log('Response for day', index + 1, ':', response.data);
        return {
          date: `Day ${index + 1}`,
          threats: response.data.error_code === 0 ? response.data.data.detection_malware : 0
        };
      });

      console.log('Daily stats:', dailyStats);
      setDailyData(dailyStats);
    } catch (err) {
      console.error('Error fetching daily data:', err);
    }
  };

  const handleChange = (e) => {
    setFilters({ 
      ...filters, 
      [e.target.name]: e.target.value,
      dateRange: e.target.name === 'min_date' || e.target.name === 'max_date' ? 'custom' : filters.dateRange
    });
  };

  // Transform classifier data for pie chart
  const malwareData = dashboardData.classifier
    .filter(item => item.type !== 'Benign')
    .map(item => ({
      name: item.type,
      value: item.total
    }));

  if (loading) {
    return <div className="admin-dashboard container">Loading...</div>;
  }

  if (error) {
    return <div className="admin-dashboard container">Error: {error}</div>;
  }

  return (
    <div className="container-fluid" style={{ maxWidth: '90%', padding: '20px' }}>
      <Header isAdmin={true} />

      <div className="filters">
        <div className="date-filters">
          <div className="date-range-buttons">
            <button 
              className={filters.dateRange === 'week' ? 'active' : ''} 
              onClick={() => handleDateRangeChange('week')}
            >
              Last 7 Days
            </button>
            <button 
              className={filters.dateRange === 'month' ? 'active' : ''} 
              onClick={() => handleDateRangeChange('month')}
            >
              Last 30 Days
            </button>
            <button 
              className={filters.dateRange === 'custom' ? 'active' : ''} 
              onClick={() => handleDateRangeChange('custom')}
            >
              Custom Range
            </button>
          </div>
          <div className="date-inputs">
            <input 
              type="date" 
              name="min_date" 
              value={filters.min_date} 
              onChange={handleChange}
              max={filters.max_date}
            />
            <span>to</span>
            <input 
              type="date" 
              name="max_date" 
              value={filters.max_date} 
              onChange={handleChange}
              min={filters.min_date}
            />
          </div>
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-box">
          <h3>Total Detections</h3>
          <p>{dashboardData.total}</p>
        </div>
        <div className="stat-box">
          <h3>Malware Detections</h3>
          <p>{dashboardData.detection_malware}</p>
        </div>
        <div className="stat-box">
          <h3>Benign Files</h3>
          <p>{dashboardData.detection_benign}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-box">
          <h4>Malware Distribution</h4>
          <div className="chart-center">
            <PieChart width={500} height={300}>
              <Pie
                data={malwareData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={false}
              >
                {malwareData
                .map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} malware`, 'Count']} />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom"
                align="center"
                formatter={(value, entry, index) => {
                  const total = malwareData.reduce((sum, item) => sum + item.value, 0);
                  const percent = ((entry.payload.value / total) * 100).toFixed(0);
                  return `${value} (${percent}%)`;
                }}
              />
            </PieChart>
          </div>
        </div>

        <div className="chart-box">
          <h4>Daily Malware Detections</h4>
          <LineChart width={500} height={300} data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} malware`, 'Detections']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="threats" 
              stroke="#6c63ff" 
              strokeWidth={2}
              name="Malware Detections"
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
