import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './UpdateForm.css';

function UpdateForm({ departments, onUpdate }) {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [asset, setAsset] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(selectedDepartment, asset, newValue);
    setSelectedDepartment('');
    setAsset('');
    setNewValue('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formDepartment">
        <Form.Label>Department</Form.Label>
        <Form.Control
          as="select"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="" disabled>Select a department</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept.title}>{dept.title}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formAsset">
        <Form.Label>Asset</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter asset"
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formNewValue">
        <Form.Label>New Value</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter new value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

export default UpdateForm;