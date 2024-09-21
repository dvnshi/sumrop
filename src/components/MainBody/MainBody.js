import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';
import './MainBody.css';

const departmentData = [
  { name: 'Public Works', value: 25, issuesReported: 30, issuesResolved: 20, staffOnboard: 150, budgetAssigned: '2 Lacs' },
  { name: 'Transportation', value: 20, issuesReported: 45, issuesResolved: 30, staffOnboard: 120, budgetAssigned: '1.5 Lacs' },
  { name: 'Parks and Recreation', value: 15, issuesReported: 20, issuesResolved: 15, staffOnboard: 80, budgetAssigned: '1 Lac' },
  { name: 'Buildings and Facilities', value: 10, issuesReported: 25, issuesResolved: 20, staffOnboard: 100, budgetAssigned: '1.2 Lacs' },
  { name: 'Water and Sewer Management', value: 15, issuesReported: 35, issuesResolved: 25, staffOnboard: 90, budgetAssigned: '1.5 Lacs' },
  { name: 'Fleet Management', value: 15, issuesReported: 15, issuesResolved: 10, staffOnboard: 60, budgetAssigned: '80 K' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#40E0D0'];

const Dashboard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  background-color: #f5f5f5;
  height: calc(100vh - 60px); // Adjust height to fit within viewport excluding the navbar height
`;

const ChartContainer = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: ${({ bgColor }) => bgColor || '#fff'};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: background-color 0.3s ease;
  height: 100%; // Ensure it takes full height
  overflow-y: auto; // Scroll if content exceeds height
`;

const InfoBox = styled.div`
  margin-bottom: 10px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Main = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [info, setInfo] = useState(departmentData[0]);
  const [bgColor, setBgColor] = useState(COLORS[0]);

  const handleMouseEnter = (_, index) => {
    // Do nothing on hover
  };

  const handleClick = (index) => {
    setActiveIndex(index);
    const selectedInfo = departmentData[index];
    setInfo(selectedInfo);
    setBgColor(COLORS[index % COLORS.length]);
  };

  return (
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
              onMouseEnter={handleMouseEnter}
              onClick={(e, index) => handleClick(index)}
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
            <Legend />
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
        </InfoContainer>
      </Dashboard>
    </div>
  );
};

export default Main;
