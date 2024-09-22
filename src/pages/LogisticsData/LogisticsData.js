import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const logisticsData = [
  { day: 'Monday', deliveries: 120 },
  { day: 'Tuesday', deliveries: 150 },
  { day: 'Wednesday', deliveries: 170 },
];

const LogisticsData = () => {
  return (
    <div>
      <h3>Logistics Data</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={logisticsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="deliveries" fill="#00C49F" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LogisticsData;
