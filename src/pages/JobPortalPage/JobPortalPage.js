import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Row, Col, Dropdown, Container } from 'react-bootstrap';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock job data
const jobData = [
  {
    id: 1,
    title: 'Urban Planner',
    company: 'Urban Solutions',
    location: 'New York, NY',
    type: 'Full-Time',
    sector: 'Urban Development',
    description: 'Design and implement sustainable urban development plans.',
  },
  {
    id: 2,
    title: 'Logistics Coordinator',
    company: 'Green Logistics Co.',
    location: 'Los Angeles, CA',
    type: 'Full-Time',
    sector: 'Logistics',
    description: 'Coordinate sustainable transportation and logistics for our supply chain.',
  },
  {
    id: 3,
    title: 'Sustainability Analyst',
    company: 'EcoWorld',
    location: 'Chicago, IL',
    type: 'Part-Time',
    sector: 'Sustainability',
    description: 'Analyze data to improve the environmental footprint of urban projects.',
  },
];

// Mock job trends data
const jobTrendsData = [
  { month: 'Jan', jobs: 50 },
  { month: 'Feb', jobs: 80 },
  { month: 'Mar', jobs: 60 },
  { month: 'Apr', jobs: 100 },
];

const JobPortalPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({ location: '', type: '', sector: '' });

  // Fetch jobs (mocked)
  useEffect(() => {
    // Replace with API call using axios for real jobs data
    setJobs(jobData);
    setFilteredJobs(jobData);
  }, []);

  // Handle filter change
  const handleFilterChange = (filterKey, value) => {
    setFilters({ ...filters, [filterKey]: value });
    applyFilters({ ...filters, [filterKey]: value });
  };

  // Apply filters
  const applyFilters = (filters) => {
    let filtered = jobData;
    if (filters.location) {
      filtered = filtered.filter(job => job.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.type) {
      filtered = filtered.filter(job => job.type === filters.type);
    }
    if (filters.sector) {
      filtered = filtered.filter(job => job.sector === filters.sector);
    }
    setFilteredJobs(filtered);
  };

  // Open Job Modal
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  // Submit job application
  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setShowModal(false);
    alert('Application submitted successfully!');
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Job Portal for Urban Development, Logistics, and Sustainability</h2>

      {/* Job Trends */}
      <Card className="mb-4">
        <Card.Header>Job Trends</Card.Header>
        <Card.Body>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobTrendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jobs" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            placeholder="Filter by Location"
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Dropdown onSelect={(value) => handleFilterChange('type', value)}>
            <Dropdown.Toggle variant="secondary" id="dropdown-type">Job Type</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Full-Time">Full-Time</Dropdown.Item>
              <Dropdown.Item eventKey="Part-Time">Part-Time</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={4}>
          <Dropdown onSelect={(value) => handleFilterChange('sector', value)}>
            <Dropdown.Toggle variant="secondary" id="dropdown-sector">Sector</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Urban Development">Urban Development</Dropdown.Item>
              <Dropdown.Item eventKey="Logistics">Logistics</Dropdown.Item>
              <Dropdown.Item eventKey="Sustainability">Sustainability</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Job Listings */}
      <Row>
        {filteredJobs.map((job) => (
          <Col md={4} key={job.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{job.company} - {job.location}</Card.Subtitle>
                <Card.Text>{job.description}</Card.Text>
                <Button variant="primary" onClick={() => handleJobClick(job)}>Apply Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Job Application Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {selectedJob?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitApplication}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Resume</Form.Label>
              <Form.Control type="file" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cover Letter</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Write your cover letter" required />
            </Form.Group>
            <Button variant="success" type="submit">Submit Application</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default JobPortalPage;
