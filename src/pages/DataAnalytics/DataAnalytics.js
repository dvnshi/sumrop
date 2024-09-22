import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import the leaflet CSS
import { Row, Col, Card, Container } from 'react-bootstrap';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Mock Data for Traffic, Resource Usage, and Logistics
const trafficData = [
  { hour: '08:00', congestionLevel: 30, avgSpeed: 50 },
  { hour: '09:00', congestionLevel: 70, avgSpeed: 30 },
  { hour: '10:00', congestionLevel: 90, avgSpeed: 20 },
];

const resourceUsageData = [
  { resource: 'Water', usage: 2000 },
  { resource: 'Electricity', usage: 5000 },
  { resource: 'Gas', usage: 1000 },
];

const pieData = [
  { name: 'Water', value: 400 },
  { name: 'Electricity', value: 300 },
  { name: 'Gas', value: 300 },
];

const logisticsData = [
  { day: 'Monday', deliveries: 120 },
  { day: 'Tuesday', deliveries: 150 },
  { day: 'Wednesday', deliveries: 170 },
];

// DataAnalytics Page Component
const DataAnalyticsPage = () => {
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    // Simulating fetching map data from an API or server
    axios.get('https://api.example.com/map-data')
      .then((response) => {
        // Assuming the response contains data for locations
        setMapData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching map data:', error);
        // Use mock data in case of API failure
        setMapData([
          { id: 1, location: 'Downtown', lat: 51.505, lng: -0.09, type: 'Congestion' },
          { id: 2, location: 'Highway 12', lat: 51.515, lng: -0.1, type: 'Delivery Hub' },
        ]);
      });
  }, []);

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Data Analytics Dashboard</h2>
        </Col>
      </Row>

      {/* Row 1: Traffic Analytics and Resource Usage */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Header>Traffic Analytics</Card.Header>
            <Card.Body>
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
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Resource Usage</Card.Header>
            <Card.Body>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Row 2: Map with Data Points */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>City Data Map</Card.Header>
            <Card.Body style={{ height: '400px' }}>
              <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                {mapData.map((point) => (
                  <Marker key={point.id} position={[point.lat, point.lng]}>
                    <Popup>{point.location}: {point.type}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Row 3: Logistics and Pie Chart for Resource Breakdown */}
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Logistics Data</Card.Header>
            <Card.Body>
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
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Resource Breakdown</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DataAnalyticsPage;
