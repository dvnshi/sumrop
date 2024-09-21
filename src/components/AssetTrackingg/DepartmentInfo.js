import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './DepartmentInfo.css';

function DepartmentInfo({ department }) {
  const { title, description } = department;
  const units = [
    { name: 'Unit 1', assets: '50', used: '30', notInUse: '20' },
    { name: 'Unit 2', assets: '30', used: '20', notInUse: '10' },
    { name: 'Unit 3', assets: '20', used: '10', notInUse: '10' },
  ];

  return (
    <div className="department-info">
      <h3>{title}</h3>
      <p>{description}</p>
      <Row>
        {units.map((unit, index) => (
          <Col key={index} sm={12} md={4}>
            <Card className="unit-card">
              <Card.Body>
                <Card.Title>{unit.name}</Card.Title>
                <Card.Text>Assets: {unit.assets}</Card.Text>
                <Card.Text>Used: {unit.used}</Card.Text>
                <Card.Text>Not in Use: {unit.notInUse}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default DepartmentInfo;