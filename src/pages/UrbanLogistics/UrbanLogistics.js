import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table } from 'react-bootstrap';
import axios from 'axios';

// Mock data for traffic statistics
const trafficData = [
  { time: '08:00 AM', traffic: 200 },
  { time: '09:00 AM', traffic: 400 },
  { time: '10:00 AM', traffic: 600 },
  { time: '11:00 AM', traffic: 800 },
  { time: '12:00 PM', traffic: 1000 },
];

// Mock data for delivery routes
const deliveryRoutes = [
  { id: 'DL001', route: 'Sector 21 to Downtown', status: 'In Progress', trafficLevel: 'Moderate' },
  { id: 'DL002', route: 'Station Road to Industrial Area', status: 'Completed', trafficLevel: 'High' },
  { id: 'DL003', route: 'City Center to Airport', status: 'Delayed', trafficLevel: 'Very High' },
];

const UrbanLogisticsPage = () => {
  const [congestionData, setCongestionData] = useState([]);
  const [deliveryData, setDeliveryData] = useState(deliveryRoutes);

  // Simulate real-time congestion data retrieval from API
  useEffect(() => {
    // Example API call to get traffic congestion data (replace with actual API)
    axios.get('https://api.example.com/traffic-congestion')
      .then(response => {
        // Assume response.data contains real-time congestion data
        setCongestionData(response.data);
      })
      .catch(error => {
        console.error('Error fetching congestion data', error);
      });
  }, []);

  return (
    <div className="urban-logistics-page">
      <h2>Urban Logistics Management</h2>

      {/* Section 1: Real-time Traffic and Delivery Route Map */}
      <div className="map-section">
        <h3>Real-time Traffic Map & Delivery Routes</h3>
        <MapContainer center={[22.7196, 75.8577]} zoom={12} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {/* Example Markers for delivery routes */}
          <Marker position={[22.7196, 75.8577]}>
            <Popup>Delivery Route 1: Sector 21 to Downtown</Popup>
          </Marker>
          <Marker position={[22.7346, 75.8527]}>
            <Popup>Delivery Route 2: Station Road to Industrial Area</Popup>
          </Marker>
          <Marker position={[22.7311, 75.8717]}>
            <Popup>Delivery Route 3: City Center to Airport</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Section 2: Traffic Congestion and Statistics */}
      <div className="traffic-statistics-section">
        <h3>Traffic Congestion Levels</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="traffic" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Section 3: Delivery Route Status Table */}
      <div className="delivery-table-section">
        <h3>Delivery Route Status</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Delivery ID</th>
              <th>Route</th>
              <th>Status</th>
              <th>Traffic Level</th>
            </tr>
          </thead>
          <tbody>
            {deliveryData.map((route) => (
              <tr key={route.id}>
                <td>{route.id}</td>
                <td>{route.route}</td>
                <td>{route.status}</td>
                <td>{route.trafficLevel}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UrbanLogisticsPage;
