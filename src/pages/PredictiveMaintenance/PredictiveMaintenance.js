import React, { useState, useEffect } from 'react';
import { Card, Form, Alert, Container, Row, Col, Dropdown } from 'react-bootstrap'; // Bootstrap components
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react'; // Icons from lucide-react

// Pie chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PredictiveMaintenance = () => {
  const [selectedInfrastructure, setSelectedInfrastructure] = useState('roads');
  const [healthData, setHealthData] = useState([]);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState([]);
  const [costSavings, setCostSavings] = useState([]);

  useEffect(() => {
    // Simulating data fetch and AI predictions
    const generateData = () => {
      // Generate health status data
      const health = [
        { name: 'Excellent', value: Math.floor(Math.random() * 40) + 10 },
        { name: 'Good', value: Math.floor(Math.random() * 30) + 20 },
        { name: 'Fair', value: Math.floor(Math.random() * 20) + 10 },
        { name: 'Poor', value: Math.floor(Math.random() * 10) + 5 },
      ];
      setHealthData(health);

      // Generate maintenance alerts
      const alerts = [
        {
          id: 1,
          severity: 'high',
          message: `${selectedInfrastructure} section A requires immediate attention`,
          predictedFailure: '2 weeks',
        },
        {
          id: 2,
          severity: 'medium',
          message: `${selectedInfrastructure} section B showing signs of wear`,
          predictedFailure: '2 months',
        },
        {
          id: 3,
          severity: 'low',
          message: `${selectedInfrastructure} section C maintenance recommended`,
          predictedFailure: '6 months',
        },
      ];
      setMaintenanceAlerts(alerts);

      // Generate cost savings data
      const savings = [
        { name: 'Preventive', value: Math.floor(Math.random() * 50000) + 10000 },
        { name: 'Reactive', value: Math.floor(Math.random() * 100000) + 50000 },
      ];
      setCostSavings(savings);
    };

    generateData();
  }, [selectedInfrastructure]);

  const handleInfrastructureChange = (event) => {
    setSelectedInfrastructure(event.target.value);
  };

  const renderAlertIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="text-danger" />;
      case 'medium':
        return <Activity className="text-warning" />;
      case 'low':
        return <CheckCircle className="text-success" />;
      default:
        return null;
    }
  };

  return (
    <Container fluid className="p-4">
      <Card className="mb-4">
        <Card.Header>
          <h2>Predictive Maintenance Dashboard</h2>
          <Form.Select
            value={selectedInfrastructure}
            onChange={handleInfrastructureChange}
            className="mt-2"
          >
            <option value="roads">Roads</option>
            <option value="bridges">Bridges</option>
            <option value="water_systems">Water Systems</option>
            <option value="power_grid">Power Grid</option>
          </Form.Select>
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col md={6}>
              <h3>Infrastructure Health Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={healthData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {healthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Col>
            <Col md={6}>
              <h3>Maintenance Cost Savings</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costSavings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
          </Row>

          <h3 className="mb-4">AI-Generated Maintenance Alerts</h3>
          {maintenanceAlerts.map((alert) => (
            <Alert variant={alert.severity === 'high' ? 'danger' : alert.severity === 'medium' ? 'warning' : 'success'} key={alert.id} className="mb-4">
              <div className="d-flex align-items-center">
                {renderAlertIcon(alert.severity)}
                <Alert.Heading className="ms-2">
                  {alert.severity.toUpperCase()} Priority Alert
                </Alert.Heading>
              </div>
              <p>
                {alert.message}
                <br />
                <strong>Predicted Failure:</strong> {alert.predictedFailure}
              </p>
            </Alert>
          ))}

          <div className="mt-4">
            <h3>AI-Driven Insights</h3>
            <p>
              Our machine learning models have analyzed historical data and current sensor readings to provide these predictive maintenance insights for {selectedInfrastructure}. By addressing potential issues before they escalate, we can significantly reduce downtime and maintenance costs while ensuring the safety and reliability of our city's infrastructure.
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PredictiveMaintenance;
