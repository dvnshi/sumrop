import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in production build
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const AnomalyDetection = () => {
  const [selectedInfrastructure, setSelectedInfrastructure] = useState('roads');
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    // Simulating data fetch and anomaly detection
    const generateData = () => {
      const data = [];
      const anomaliesDetected = [];
      for (let i = 0; i < 30; i++) {
        const value = Math.random() * 100;
        data.push({ day: i + 1, value });
        if (value > 80 || value < 20) {
          anomaliesDetected.push({
            id: i,
            name: `${selectedInfrastructure.charAt(0).toUpperCase() + selectedInfrastructure.slice(1)} Anomaly ${i + 1}`,
            description: `Unusual ${value > 80 ? 'high' : 'low'} reading detected`,
            lat: 28.6139 + (Math.random() - 0.5) * 0.1,
            lng: 77.2090 + (Math.random() - 0.5) * 0.1,
          });
        }
      }
      setTimeSeriesData(data);
      setAnomalies(anomaliesDetected);
    };

    generateData();
  }, [selectedInfrastructure]);

  const handleInfrastructureChange = (event) => {
    setSelectedInfrastructure(event.target.value);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader title="Anomaly Detection" />
      <CardContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="infrastructure-select-label">Select Infrastructure</InputLabel>
          <Select
            labelId="infrastructure-select-label"
            value={selectedInfrastructure}
            onChange={handleInfrastructureChange}
            label="Select Infrastructure"
          >
            <MenuItem value="roads">Roads</MenuItem>
            <MenuItem value="bridges">Bridges</MenuItem>
            <MenuItem value="pipelines">Pipelines</MenuItem>
            <MenuItem value="powerlines">Power Lines</MenuItem>
          </Select>
        </FormControl>

        <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottomRight', offset: -10 }} />
            <YAxis label={{ value: 'Performance', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>

        <h3 className="text-xl font-semibold my-4">Detected Anomalies</h3>
        <div style={{ height: '400px', width: '100%' }}>
          <MapContainer center={[28.6139, 77.2090]} zoom={11} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {anomalies.map((anomaly) => (
              <Marker key={anomaly.id} position={[anomaly.lat, anomaly.lng]}>
                <Popup>
                  <strong>{anomaly.name}</strong><br />
                  {anomaly.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold">Analysis</h3>
          <p className="mt-2">
            The anomaly detection system has identified {anomalies.length} potential issues in the {selectedInfrastructure} infrastructure.
            These anomalies are marked on the map above. Early detection allows for proactive maintenance and can prevent major failures.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnomalyDetection;
