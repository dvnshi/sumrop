import React from 'react'; 
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import Navbar from './components/Navbar/Navbar'; 
import Sidebar from './components/Sidebar/Sidebar'; 
import styled from 'styled-components'; 
import Home from './pages/Home/Home'; 
import TrafficManagement from './pages/TrafficManagement/TrafficManagement'; 
import UrbanLogistics from './pages/UrbanLogistics/UrbanLogistics'; 
import ResourceAllocation from './pages/ResourceAllocation/ResourceAllocation'; 
import CitizenEngagement from './pages/CitizenEngagement/CitizenEngagement'; 
import DataAnalytics from './pages/DataAnalytics/DataAnalytics'; 
import Report from './pages/Report/Report'; 
import './App.css'; 
import TrafficAnalytics from './pages/TrafficAnalytics/TrafficAnalytics'; 
import ResourceUsageAnalytics from './pages/ResourceUsageAnalytics/ResourceUsageAnalytics'; 
import LogisticsData from './pages/LogisticsData/LogisticsData'; 
import MaintenanceReports from './pages/MaintenanceReports/MaintenanceReports'; 
import QueryBoard from './pages/PredictiveMaintenance/PredictiveMaintenance'; 
import Scheme from './pages/Scheme/Scheme'; 
import Chatbot from './pages/Chatbot/Chatbot'; 
import JobPortalPage from './pages/JobPortalPage/JobPortalPage'; 
import AnomalyDetection from './pages/AnamolyDetection/AnamolyDetection'; 
import PredictiveMaintenance from './pages/PredictiveMaintenance/PredictiveMaintenance'; 

const MainContent = styled.div` 
  margin-left: 250px; 
  margin-top: 60px; 
  padding: 20px; 
  height: calc(100vh - 60px); 
  overflow-y: auto; 
`; 
 
function App() { 
  return ( 
    <> 
      <Sidebar /> 
      <Navbar /> 
      <MainContent> 
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/query-board" element={<QueryBoard />} /> 
          <Route path="/scheme" element={<Scheme />} /> 
          <Route path="/report" element={<Report />} /> 
          <Route path="/chatbot" element={<Chatbot />} /> 
          <Route path="/predictive-maintenance" element={<PredictiveMaintenance />} /> 
          <Route path="/anamoly-detection" element={<AnomalyDetection />} /> 
          <Route path="/job-portal-page" element={<JobPortalPage />} /> 
          <Route path="/traffic-management" element={<TrafficManagement />} /> 
          <Route path="/urban-logistics" element={<UrbanLogistics />} /> 
          <Route path="/resource-allocation" element={<ResourceAllocation />} /> 
          <Route path="/citizen-engagement" element={<CitizenEngagement />} /> 
          <Route path="/data-analytics" element={<DataAnalytics />} /> 
          <Route path="/traffic-analytics" element={<TrafficAnalytics />} /> 
          <Route path="/resource-usage-analytics" element={<ResourceUsageAnalytics />} /> 
          <Route path="/logistics-data" element={<LogisticsData />} /> 
          <Route path="/maintenance-reports" element={<MaintenanceReports />} /> 
        </Routes> 
      </MainContent> 
    </> 
  ); 
} 
 
export default App;
