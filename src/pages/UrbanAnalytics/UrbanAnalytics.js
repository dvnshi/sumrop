import React, { useState, useEffect } from 'react';
import { Select, Card, CardHeader, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UrbanAnalytics = () => {
  const [selectedAnalytic, setSelectedAnalytic] = useState('traffic');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating data fetch based on selected analytic
    const fetchData = () => {
      let newData;
      switch (selectedAnalytic) {
        case 'traffic':
          newData = [
            { name: 'Mon', value: 4000 },
            { name: 'Tue', value: 3000 },
            { name: 'Wed', value: 2000 },
            { name: 'Thu', value: 2780 },
            { name: 'Fri', value: 1890 },
            { name: 'Sat', value: 2390 },
            { name: 'Sun', value: 3490 },
          ];
          break;
        case 'resource':
          newData = [
            { name: 'Water', value: 3000 },
            { name: 'Electricity', value: 1500 },
            { name: 'Gas', value: 2000 },
            { name: 'Internet', value: 2780 },
          ];
          break;
        case 'logistics':
          newData = [
            { name: 'Deliveries', value: 4000 },
            { name: 'Warehousing', value: 3000 },
            { name: 'Transport', value: 2000 },
            { name: 'Inventory', value: 2780 },
          ];
          break;
        case 'maintenance':
          newData = [
            { name: 'Roads', value: 3000 },
            { name: 'Buildings', value: 1500 },
            { name: 'Utilities', value: 2000 },
            { name: 'Parks', value: 2780 },
          ];
          break;
        default:
          newData = [];
      }
      setData(newData);
    };

    fetchData();
  }, [selectedAnalytic]);

  const handleAnalyticChange = (event) => {
    setSelectedAnalytic(event.target.value);
  };

  const getChartTitle = () => {
    switch (selectedAnalytic) {
      case 'traffic':
        return 'Traffic Analytics';
      case 'resource':
        return 'Resource Usage Analytics';
      case 'logistics':
        return 'Logistics Data';
      case 'maintenance':
        return 'Maintenance Reports';
      default:
        return 'Urban Analytics';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Urban Analytics</h2>
        <Select
          value={selectedAnalytic}
          onChange={handleAnalyticChange}
          className="mt-2"
        >
          <option value="traffic">Traffic Analytics</option>
          <option value="resource">Resource Usage Analytics</option>
          <option value="logistics">Logistics Data</option>
          <option value="maintenance">Maintenance Reports</option>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">{getChartTitle()}</h3>
          <p className="mt-2">
            This chart displays the latest data for {getChartTitle().toLowerCase()}. 
            Use the dropdown above to switch between different urban analytics views.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UrbanAnalytics;