import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrafficManagementDashboard = () => {
  const [trafficData, setTrafficData] = useState([]);
  const [congestionHotspots, setCongestionHotspots] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');

  useEffect(() => {
    fetchTrafficData();
    const interval = setInterval(fetchTrafficData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchTrafficData = () => {
    // Simulating API call
    const newTrafficData = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      congestionLevel: Math.floor(Math.random() * 100),
      avgSpeed: Math.floor(Math.random() * 60) + 20,
    }));
    setTrafficData(newTrafficData);

    const newHotspots = [
      { id: 1, location: 'Downtown Intersection', level: 'High', coordinates: { lat: 18.5204, lng: 73.8567 } },
      { id: 2, location: 'Highway Exit 12', level: 'Medium', coordinates: { lat: 18.5314, lng: 73.8446 } },
      { id: 3, location: 'Central Bridge', level: 'Critical', coordinates: { lat: 18.5089, lng: 73.8259 } },
    ];
    setCongestionHotspots(newHotspots);
  };

  const handleSearch = () => {
    const found = congestionHotspots.find(hotspot => 
      hotspot.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSelectedLocation(found || null);
  };

  const handleActionClick = (action) => {
    setCurrentAction(action);
    setIsActionDialogOpen(true);
  };

  const executeAction = () => {
    console.log(`Executing action: ${currentAction}`);
    setIsActionDialogOpen(false);
    // Here you would typically make an API call to your backend
  };

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Traffic Management Dashboard</h1>
      
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <input 
          type="text"
          placeholder="Search location..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '0.5rem', flexGrow: 1 }}
        />
        <button onClick={handleSearch} style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Search</button>
      </div>

      {selectedLocation && (
        <div style={{ backgroundColor: '#f0f0f0', padding: '1rem', marginBottom: '1rem', borderRadius: '4px' }}>
          <h3>{selectedLocation.location}</h3>
          <p>Congestion Level: {selectedLocation.level}</p>
          <p>Coordinates: {selectedLocation.coordinates.lat}, {selectedLocation.coordinates.lng}</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '4px' }}>
          <h3>Current Traffic Status</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Moderate</p>
        </div>
        <div style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '4px' }}>
          <h3>Average Speed</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{trafficData.length > 0 ? `${trafficData[trafficData.length - 1].avgSpeed} km/h` : 'Loading...'}</p>
        </div>
        <div style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '4px' }}>
          <h3>Active Incidents</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3</p>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Traffic Congestion Over Time</h2>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
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
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Congestion Hotspots</h2>
        <div>
          {congestionHotspots.map((hotspot) => (
            <div key={hotspot.id} style={{ backgroundColor: hotspot.level === 'Critical' ? '#FFCCCB' : '#f0f0f0', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px' }}>
              <h3>{hotspot.location}</h3>
              <p>Congestion Level: {hotspot.level}</p>
              <p>Coordinates: {hotspot.coordinates.lat}, {hotspot.coordinates.lng}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Traffic Control Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
          <button onClick={() => handleActionClick('Adjust Signal Timings')} style={{ padding: '0.5rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Adjust Signal Timings</button>
          <button onClick={() => handleActionClick('Redirect Traffic')} style={{ padding: '0.5rem', backgroundColor: '#008CBA', color: 'white', border: 'none', cursor: 'pointer' }}>Redirect Traffic</button>
          <button onClick={() => handleActionClick('Issue Travel Advisory')} style={{ padding: '0.5rem', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>Issue Travel Advisory</button>
          <button onClick={() => handleActionClick('Deploy Traffic Marshals')} style={{ padding: '0.5rem', backgroundColor: '#555555', color: 'white', border: 'none', cursor: 'pointer' }}>Deploy Traffic Marshals</button>
        </div>
      </div>

      {isActionDialogOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '4px', maxWidth: '400px' }}>
            <h2 style={{ marginBottom: '1rem' }}>{currentAction}</h2>
            <p style={{ marginBottom: '1rem' }}>Are you sure you want to {currentAction.toLowerCase()}? This action will affect traffic flow in the selected area.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setIsActionDialogOpen(false)} style={{ marginRight: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#f0f0f0', border: 'none', cursor: 'pointer' }}>Cancel</button>
              <button onClick={executeAction} style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafficManagementDashboard;