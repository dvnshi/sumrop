// src/pages/AnamolyDetection/AnamolyDetection.js
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import './AnamolyDetection.css'
const AnomalyDetection = () => {
  // Sample data for line chart
  const data = [
    { name: 'Jan', asset1: 400, asset2: 240, asset3: 240 },
    { name: 'Feb', asset1: 300, asset2: 139, asset3: 221 },
    { name: 'Mar', asset1: 200, asset2: 980, asset3: 229 },
    { name: 'Apr', asset1: 278, asset2: 390, asset3: 200 },
    { name: 'May', asset1: 189, asset2: 480, asset3: 218 },
    { name: 'Jun', asset1: 239, asset2: 380, asset3: 250 },
    { name: 'Jul', asset1: 349, asset2: 430, asset3: 210 },
  ];

  // Sample data for anomaly details
  const anomalyData = [
    {
      key: '1',
      department: 'Public Works',
      assetId: 'PW123',
      problem: 'High fluctuation in usage',
      solution: 'Inspect asset',
      budget: 'Rs 500000',
    },
    {
      key: '2',
      department: 'Transportation',
      assetId: 'T456',
      problem: 'Sudden drop in performance',
      solution: 'Replace component',
      budget: 'Rs 1500000',
    },
    {
      key: '3',
      department: 'Parks and Recreation',
      assetId: 'PR789',
      problem: 'Irregular activity pattern',
      solution: 'Recalibrate sensors',
      budget: 'Rs 50000',
    },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Anomaly Detection
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="asset1" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="asset2" stroke="#82ca9d" />
          <Line type="monotone" dataKey="asset3" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
      <Typography variant="h6" gutterBottom>
        Assets with Anomalies
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Department</TableCell>
              <TableCell>Asset ID</TableCell>
              <TableCell>Problem Detected</TableCell>
              <TableCell>Predicted Solution</TableCell>
              <TableCell>Budget</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {anomalyData.map((row) => (
              <TableRow key={row.key}>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.assetId}</TableCell>
                <TableCell>{row.problem}</TableCell>
                <TableCell>{row.solution}</TableCell>
                <TableCell>{row.budget}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AnomalyDetection;
