import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

// Data for departments and use case statistics
const departmentData = [
  { name: 'Public Works', value: 25, issuesReported: 30, issuesResolved: 20, staffOnboard: 150, budgetAssigned: '2 Lacs' },
  { name: 'Transportation', value: 20, issuesReported: 45, issuesResolved: 30, staffOnboard: 120, budgetAssigned: '1.5 Lacs' },
  { name: 'Parks and Recreation', value: 15, issuesReported: 20, issuesResolved: 15, staffOnboard: 80, budgetAssigned: '1 Lac' },
  { name: 'Buildings and Facilities', value: 10, issuesReported: 25, issuesResolved: 20, staffOnboard: 100, budgetAssigned: '1.2 Lacs' },
  { name: 'Water and Sewer Management', value: 15, issuesReported: 35, issuesResolved: 25, staffOnboard: 90, budgetAssigned: '1.5 Lacs' },
  { name: 'Fleet Management', value: 15, issuesReported: 15, issuesResolved: 10, staffOnboard: 60, budgetAssigned: '80 K' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#40E0D0'];

const trafficData = [
  { name: 'Monday', congestion: 60, resolved: 55 },
  { name: 'Tuesday', congestion: 50, resolved: 45 },
  { name: 'Wednesday', congestion: 80, resolved: 75 },
  { name: 'Thursday', congestion: 65, resolved: 60 },
  { name: 'Friday', congestion: 90, resolved: 85 },
];

// Styled components
const Dashboard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f5f5f5;
  height: calc(100vh - 60px);
`;

const ChartContainer = styled.div`
  flex: 2;
  padding-right: 20px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: ${({ bgColor }) => bgColor || '#fff'};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  height: auto;
  overflow-y: auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #282c34;
  padding: 10px 20px;
  color: white;
`;

const StatsSection = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const InfoBox = styled.div`
  margin-bottom: 10px;
`;

const TrafficSection = styled.div`
  margin-top: 40px;
`;

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [info, setInfo] = useState(departmentData[0]);
  const [bgColor, setBgColor] = useState(COLORS[0]);

  const handleClick = (_, index) => {
    setActiveIndex(index);
    const selectedInfo = departmentData[index];
    setInfo(selectedInfo);
    setBgColor(COLORS[index % COLORS.length]);
  };

  return (
    <>
      {/* <Header>
        <h1>SUMROP Dashboard</h1>
        <p>Smart Urban Mobility & Resource Optimization Platform</p>
      </Header> */}

      <div className='main'>
        <Dashboard>
          <ChartContainer>
            <PieChart width={600} height={400}>
              <Pie
                data={departmentData}
                cx={300}
                cy={200}
                labelLine={false}
                label={({ name }) => name}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                onClick={handleClick} // Make sure this is correct
              >
                {departmentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke={index === activeIndex ? 'black' : ''}
                    strokeWidth={index === activeIndex ? 2 : 1}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartContainer>

          <InfoContainer bgColor={bgColor}>
            <Title>{info.name} Department</Title>
            <InfoBox>
              <strong>Issues Reported:</strong> {info.issuesReported}
            </InfoBox>
            <InfoBox>
              <strong>Issues Resolved:</strong> {info.issuesResolved}/{info.issuesReported}
            </InfoBox>
            <InfoBox>
              <strong>Staff Onboard:</strong> {info.staffOnboard}
            </InfoBox>
            <InfoBox>
              <strong>Budget Assigned This Month:</strong> {info.budgetAssigned}
            </InfoBox>

            {/* New Section: Traffic Congestion Data */}
            <TrafficSection>
              <Title>Traffic Congestion</Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="congestion" fill="#FF8042" />
                  <Bar dataKey="resolved" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </TrafficSection>
          </InfoContainer>
        </Dashboard>
      </div>
    </>
  );
};

export default Home;
