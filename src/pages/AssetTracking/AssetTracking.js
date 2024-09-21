import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DepartmentCard from '../../components/AssetTrackingg/DepartmentCard';
import DepartmentInfo from '../../components/AssetTrackingg/DepartmentInfo';
import UpdateForm from '../../components/AssetTrackingg/UpdateForm';
import './AssetTracking.css';

function AssetTracking() {
  const departments = [
    { title: 'Public Works', description: 'Assets: 100, Used: 60, Not in Use: 40' },
    { title: 'Transportation', description: 'Assets: 200, Used: 150, Not in Use: 50' },
    { title: 'Parks and Recreation', description: 'Assets: 120, Used: 80, Not in Use: 40' },
    { title: 'Buildings and Facilities', description: 'Assets: 300, Used: 250, Not in Use: 50' },
    { title: 'Water and Sewer Management', description: 'Assets: 400, Used: 350, Not in Use: 50' },
    { title: 'Fleet Management', description: 'Assets: 150, Used: 100, Not in Use: 50' },
  ];

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleCardClick = (department) => {
    setSelectedDepartment(department);
  };

  const handleUpdate = (department, asset, newValue) => {
    // Handle the update logic here
    console.log(`Updated ${asset} in ${department} to ${newValue}`);
  };

  return (
    <div className="AssetTracking">
      <Container>
        <Row>
          {departments.map((dept, index) => (
            <Col key={index} sm={12} md={6} lg={4}>
              <DepartmentCard
                title={dept.title}
                description={dept.description}
                onClick={() => handleCardClick(dept)}
              />
            </Col>
          ))}
        </Row>
        {selectedDepartment && <DepartmentInfo department={selectedDepartment} />}
        <UpdateForm departments={departments} onUpdate={handleUpdate} />
      </Container>
    </div>
  );
}

export default AssetTracking;
