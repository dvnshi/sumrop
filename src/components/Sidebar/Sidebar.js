import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/logo.png'; // Update with the SUMROP logo
import './Sidebar.css';
import Dropdown from 'react-bootstrap/Dropdown';

const SidebarContainer = styled.div`
  height: 100vh; // Full height of the viewport
  width: 250px;
  background-color: #1a242f; // Darker background for a professional feel
  color: #ecf0f1;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  box-sizing: border-box;
`;

const SidebarItem = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  display: block;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  &:hover {
    background-color: #34495e;
  }
`;

const SidebarTitle = styled.h2`
  color: #ecf0f1;
  margin-bottom: 20px;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarTitle>
        <img className='logo-img' src={logo} alt="SUMROP Logo" height={160} width={160}/>
      </SidebarTitle>

      {/* Dropdown for Analytics */}
      <Dropdown>
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          Urban Analytics
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/traffic-analytics">Traffic Analytics</Dropdown.Item>
          <Dropdown.Item as={Link} to="/resource-usage-analytics">Resource Usage Analytics</Dropdown.Item>
          <Dropdown.Item as={Link} to="/logistics-data">Logistics Data</Dropdown.Item>
          <Dropdown.Item as={Link} to="/maintenance-reports">Maintenance Reports</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Sidebar Items */}
      <SidebarItem to="/traffic-management">Traffic Management</SidebarItem>
      <SidebarItem to="/urban-logistics">Urban Logistics</SidebarItem>
      <SidebarItem to="/resource-allocation">Resource Allocation</SidebarItem>
      <SidebarItem to="/citizen-engagement">Citizen Engagement</SidebarItem>
      <SidebarItem to="/data-analytics">Data Analytics</SidebarItem>
      {/* <SidebarItem to="/reports">Reports</SidebarItem> */}
    </SidebarContainer>
  );
};

export default Sidebar;