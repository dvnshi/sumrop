// src/components/Navbar.js
import React from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import your custom CSS file
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import logo from '../../assets/logo.png'

const NavbarComponent = () => {
  const location = useLocation(); // Get current location

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Navbar.Brand as={Link} to="/" >Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          

           {/* <img className='logo-imgg' src={logo} alt="Logo" height={160} width={160}/>

           */}
          <Nav.Link
            as={Link}
            to="/chatbot"
            className={location.pathname === '/chatbot' ? 'active' : ''}
          >
            Chatbot
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/anamoly-detection"
            className={location.pathname === '/anamoly-detection' ? 'active' : ''}
          >
            Anamoly Detection
          </Nav.Link>

          

          <Nav.Link
            as={Link}
            to="/report"
            className={location.pathname === '/report' ? 'active' : ''}
          >
            Report
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/predictive-maintenance"
            className={location.pathname === '/predictive-maintenance' ? 'active' : ''}
          >
            Predictive Maintenance
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/job-portal-page"
            className={location.pathname === '/job-portal-page' ? 'active' : ''}
          >
            Job Portal
          </Nav.Link>

{/*             
            <Nav.Link
            as={Link}
            to="/scheme"
            className={location.pathname === '/scheme' ? 'active' : ''}
          >
            Schemes
          </Nav.Link> */}

          {/* <Nav.Link
            as={Link}
            to="/login-as-admin"
            className={location.pathname === '/login-as-admin' ? 'active' : ''}
          >
            Login as ADMIN
          </Nav.Link> */}
 

          {/* <Nav.Link
            as={Link}
            to="/login-as-admin"
            className={location.pathname === '/login-as-admin' ? 'active' : ''}
          >
            Login as ADMIN
          </Nav.Link> */}
          
          
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
