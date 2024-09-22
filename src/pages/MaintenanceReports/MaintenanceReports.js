import React from 'react';

const maintenanceReportsData = [
  { id: 1, type: 'Road Repair', status: 'In Progress' },
  { id: 2, type: 'Streetlight Fix', status: 'Completed' },
  { id: 3, type: 'Water Leakage', status: 'Pending' },
];

const MaintenanceReports = () => {
  return (
    <div>
      <h3>Maintenance Reports</h3>
      <ul>
        {maintenanceReportsData.map((report) => (
          <li key={report.id}>
            {report.type} - {report.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceReports;
