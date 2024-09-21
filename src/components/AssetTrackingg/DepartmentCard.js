import React from 'react';
import { Card } from 'react-bootstrap';
import './DepartmentCard.css';

function DepartmentCard({ title, description, onClick }) {
  return (
    <Card className="department-card" onClick={onClick}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default DepartmentCard;