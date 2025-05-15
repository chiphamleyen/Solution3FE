import React, { useState } from 'react';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './AdminDashboard.css';
import Header from '../Shared/Header';

const COLORS = ['#6c63ff', '#ff6384', '#36a2eb', '#ffcd56'];

const AdminDashboard = () => {
  const [filters, setFilters] = useState({
    date: '',
    user: '',
    severity: '',
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const malwareData = [
    { name: 'Trojan', value: 30 },
    { name: 'Ransomware', value: 20 },
    { name: 'Spyware', value: 25 },
    { name: 'Adware', value: 25 },
  ];

  const threatTrends = [
    { week: 'Week 1', threats: 40 },
    { week: 'Week 2', threats: 55 },
    { week: 'Week 3', threats: 30 },
    { week: 'Week 4', threats: 70 },
  ];

  return (
    <div className="admin-dashboard container">
      <Header />

      <div className="filters">
        <input type="date" name="date" value={filters.date} onChange={handleChange} />
        <input type="text" name="user" placeholder="User" value={filters.user} onChange={handleChange} />
        <select name="severity" value={filters.severity} onChange={handleChange}>
          <option value="">All Severities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="charts">
        <div className="chart-box">
          <h4>Real-time Malware Distribution</h4>
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
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {malwareData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        <div className="chart-box">
          <h4>Historical Threat Trends</h4>
          <LineChart width={500} height={300} data={threatTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="threats" stroke="#6c63ff" strokeWidth={2} />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
