import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const resourceUsageData = [
  { resource: 'Water', usage: 2000 },
  { resource: 'Electricity', usage: 5000 },
  { resource: 'Gas', usage: 1000 },
];

const ResourceUsageAnalytics = () => {
  return (
    <div>
      <h3>Resource Usage Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={resourceUsageData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="resource" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="usage" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResourceUsageAnalytics;
