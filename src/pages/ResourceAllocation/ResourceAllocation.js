import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ResourceAllocationDashboard = () => {
  const [resources, setResources] = useState({
    publicTransport: { buses: 50, trains: 20 },
    energyConsumption: { residential: 40, commercial: 35, industrial: 25 },
    emergencyServices: { police: 30, fire: 25, ambulance: 20 },
    waterSupply: 80,
  });
  const [allocationHistory, setAllocationHistory] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [allocationAmount, setAllocationAmount] = useState(0);

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      updateResourcesRandomly();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateResourcesRandomly = () => {
    setResources(prevResources => ({
      publicTransport: {
        buses: Math.max(0, prevResources.publicTransport.buses + Math.floor(Math.random() * 5) - 2),
        trains: Math.max(0, prevResources.publicTransport.trains + Math.floor(Math.random() * 3) - 1)
      },
      energyConsumption: {
        residential: Math.max(0, Math.min(100, prevResources.energyConsumption.residential + Math.floor(Math.random() * 5) - 2)),
        commercial: Math.max(0, Math.min(100, prevResources.energyConsumption.commercial + Math.floor(Math.random() * 5) - 2)),
        industrial: Math.max(0, Math.min(100, prevResources.energyConsumption.industrial + Math.floor(Math.random() * 5) - 2))
      },
      emergencyServices: {
        police: Math.max(0, prevResources.emergencyServices.police + Math.floor(Math.random() * 3) - 1),
        fire: Math.max(0, prevResources.emergencyServices.fire + Math.floor(Math.random() * 3) - 1),
        ambulance: Math.max(0, prevResources.emergencyServices.ambulance + Math.floor(Math.random() * 3) - 1)
      },
      waterSupply: Math.max(0, Math.min(100, prevResources.waterSupply + Math.floor(Math.random() * 5) - 2))
    }));
  };

  const handleAllocation = () => {
    if (selectedResource && allocationAmount) {
      setResources(prevResources => {
        const updatedResources = { ...prevResources };
        if (selectedResource.includes('.')) {
          const [category, subcategory] = selectedResource.split('.');
          updatedResources[category][subcategory] = Math.max(0, updatedResources[category][subcategory] + parseInt(allocationAmount));
        } else {
          updatedResources[selectedResource] = Math.max(0, updatedResources[selectedResource] + parseInt(allocationAmount));
        }
        return updatedResources;
      });

      setAllocationHistory(prevHistory => [
        ...prevHistory,
        { resource: selectedResource, amount: parseInt(allocationAmount), timestamp: new Date().toLocaleString() }
      ]);

      setSelectedResource(null);
      setAllocationAmount(0);
    }
  };

  const renderResourceControls = () => (
    <div style={styles.controlPanel}>
      <h3 style={styles.subheader}>Resource Allocation Control</h3>
      <select 
        value={selectedResource || ''}
        onChange={(e) => setSelectedResource(e.target.value)}
        style={styles.select}
      >
        <option value="">Select Resource</option>
        <option value="publicTransport.buses">Public Transport - Buses</option>
        <option value="publicTransport.trains">Public Transport - Trains</option>
        <option value="energyConsumption.residential">Energy - Residential</option>
        <option value="energyConsumption.commercial">Energy - Commercial</option>
        <option value="energyConsumption.industrial">Energy - Industrial</option>
        <option value="emergencyServices.police">Emergency Services - Police</option>
        <option value="emergencyServices.fire">Emergency Services - Fire</option>
        <option value="emergencyServices.ambulance">Emergency Services - Ambulance</option>
        <option value="waterSupply">Water Supply</option>
      </select>
      <input
        type="number"
        value={allocationAmount}
        onChange={(e) => setAllocationAmount(e.target.value)}
        placeholder="Amount"
        style={styles.input}
      />
      <button onClick={handleAllocation} style={styles.button}>Allocate</button>
    </div>
  );

  const renderAllocationHistory = () => (
    <div style={styles.historyPanel}>
      <h3 style={styles.subheader}>Allocation History</h3>
      <ul style={styles.historyList}>
        {allocationHistory.slice(-5).reverse().map((entry, index) => (
          <li key={index} style={styles.historyItem}>
            {entry.timestamp}: Allocated {entry.amount} to {entry.resource}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderResourceCharts = () => (
    <div style={styles.chartsContainer}>
      <div style={styles.chartWrapper}>
        <h3 style={styles.subheader}>Public Transport</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={[
            { name: 'Buses', value: resources.publicTransport.buses },
            { name: 'Trains', value: resources.publicTransport.trains }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={styles.chartWrapper}>
        <h3 style={styles.subheader}>Energy Consumption</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={Object.entries(resources.energyConsumption).map(([key, value]) => ({ name: key, value }))}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {Object.entries(resources.energyConsumption).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={styles.chartWrapper}>
        <h3 style={styles.subheader}>Emergency Services</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={Object.entries(resources.emergencyServices).map(([key, value]) => ({ name: key, value }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={styles.chartWrapper}>
        <h3 style={styles.subheader}>Water Supply</h3>
        <div style={styles.waterSupplyWrapper}>
          <div style={{...styles.waterSupplyBar, width: `${resources.waterSupply}%`}}></div>
          <span style={styles.waterSupplyText}>{resources.waterSupply}%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.dashboard}>
      <h1 style={styles.header}>Resource Allocation Dashboard</h1>
      {renderResourceControls()}
      {renderAllocationHistory()}
      {renderResourceCharts()}
    </div>
  );
};

const styles = {
  dashboard: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  subheader: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#444',
  },
  controlPanel: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  historyPanel: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  historyList: {
    listStyleType: 'none',
    padding: 0,
  },
  historyItem: {
    marginBottom: '5px',
    fontSize: '14px',
  },
  chartsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  chartWrapper: {
    width: 'calc(50% - 10px)',
    marginBottom: '20px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  waterSupplyWrapper: {
    width: '100%',
    height: '30px',
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
    overflow: 'hidden',
    position: 'relative',
  },
  waterSupplyBar: {
    height: '100%',
    backgroundColor: '#2196F3',
    transition: 'width 0.5s ease-in-out',
  },
  waterSupplyText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default ResourceAllocationDashboard;