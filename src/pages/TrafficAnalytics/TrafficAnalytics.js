import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const trafficData = [
  { hour: '08:00', congestionLevel: 30, avgSpeed: 50 },
  { hour: '09:00', congestionLevel: 70, avgSpeed: 30 },
  { hour: '10:00', congestionLevel: 90, avgSpeed: 20 },
];

const TrafficAnalytics = () => {
  return (
    <div>
      <h3>Traffic Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trafficData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="congestionLevel" stroke="#8884d8" name="Congestion Level" />
          <Line type="monotone" dataKey="avgSpeed" stroke="#82ca9d" name="Average Speed" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficAnalytics;
