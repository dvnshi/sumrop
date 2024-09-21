import React, { useState } from 'react';
import { Layout, Card, Table, Select, Typography } from 'antd';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './AssetAnalytics.css'; // Import the custom CSS file

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const assetPerformanceData = [
  { month: 'Jan', vehicles: 85, buildings: 92, equipment: 78 },
  { month: 'Feb', vehicles: 88, buildings: 90, equipment: 82 },
  { month: 'Mar', vehicles: 90, buildings: 91, equipment: 85 },
  { month: 'Apr', vehicles: 87, buildings: 93, equipment: 80 },
  { month: 'May', vehicles: 91, buildings: 94, equipment: 88 },
  { month: 'Jun', vehicles: 92, buildings: 95, equipment: 90 },
];

const assetUtilizationData = [
  { name: 'Vehicles', value: 75 },
  { name: 'Buildings', value: 85 },
  { name: 'Equipment', value: 60 },
];

const maintenanceLogsData = [
  { id: 1, asset: 'Vehicle 1', type: 'Routine', date: '2023-06-15', cost: 500 },
  { id: 2, asset: 'Building A', type: 'Emergency', date: '2023-06-18', cost: 2000 },
  { id: 3, asset: 'Equipment X', type: 'Preventive', date: '2023-06-20', cost: 800 },
  { id: 4, asset: 'Vehicle 2', type: 'Routine', date: '2023-06-22', cost: 600 },
  { id: 5, asset: 'Building B', type: 'Routine', date: '2023-06-25', cost: 1500 },
];

const sensorData = [
  { id: 1, name: 'Sensor 1', type: 'Temperature', value: 22.5, latitude: 51.505, longitude: -0.09 },
  { id: 2, name: 'Sensor 2', type: 'Humidity', value: 45, latitude: 51.51, longitude: -0.1 },
  { id: 3, name: 'Sensor 3', type: 'Air Quality', value: 85, latitude: 51.515, longitude: -0.08 },
];

const AssetPerformance = () => {
  const [selectedAssetType, setSelectedAssetType] = useState('vehicles');

  const columns = [
    { title: 'Asset', dataIndex: 'asset', key: 'asset' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Cost', dataIndex: 'cost', key: 'cost', render: (text) => `$${text}` },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '20px' }}>
        <Title level={2}>Data Integration and Analytics Dashboard</Title>

        <Card title="Asset Performance" className="dashboard-card" style={{ marginBottom: '20px' }}>
          <Select defaultValue="vehicles" style={{ width: 120, marginBottom: '20px' }} onChange={setSelectedAssetType}>
            <Option value="vehicles">Vehicles</Option>
            <Option value="buildings">Buildings</Option>
            <Option value="equipment">Equipment</Option>
          </Select>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={assetPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={selectedAssetType} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Asset Utilization" className="dashboard-card" style={{ marginBottom: '20px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={assetUtilizationData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Maintenance Logs" className="dashboard-card" style={{ marginBottom: '20px' }}>
          <Table dataSource={maintenanceLogsData} columns={columns} rowKey="id" />
        </Card>

        <Card title="Sensor Locations" className="dashboard-card">
          <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '300px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {sensorData.map(sensor => (
              <Marker key={sensor.id} position={[sensor.latitude, sensor.longitude]}>
                <Popup>
                  {sensor.name} - {sensor.type}: {sensor.value}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Card>
      </Content>
    </Layout>
  );
};

export default AssetPerformance;
