import React, { useState } from 'react';
import DepartmentCard from '../../components/AssetTrackingg/DepartmentCard';
import UpdateForm from '../../components/AssetTrackingg/UpdateForm';
import { Container, Row, Col } from 'react-bootstrap';
import './HomePage.css';

function HomePage() {
  const [departments, setDepartments] = useState([
    { title: 'Public Works', asset: 'Asset1', value: 'Value1' },
    { title: 'Transportation', asset: 'Highways', value: '15' },
    { title: 'Parks and Recreation', asset: 'Parks', value: '20' },
    { title: 'Buildings and Facilities', asset: 'Buildings', value: '50' },
    { title: 'Water and Sewer Management', asset: 'Pipelines', value: '100km' },
    { title: 'Fleet Management', asset: 'Vehicles', value: '30' },
  ]);

  const handleUpdate = (title, asset, newValue) => {
    setDepartments((prevDepartments) =>
      prevDepartments.map((dept) =>
        dept.title === title ? { ...dept, asset, value: newValue } : dept
      )
    );
  };

  return (
    <Container className="home-page">
      <Row>
        {departments.map((department, index) => (
          <Col key={index} md={4}>
            <DepartmentCard
              title={department.title}
              asset={department.asset}
              value={department.value}
            />
          </Col>
        ))}
      </Row>
      <div className="update-form-container">
        <h3>Update Asset</h3>
        <UpdateForm departments={departments} onUpdate={handleUpdate} />
      </div>
    </Container>
  );
}

export default HomePage;