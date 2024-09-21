import React, { useState } from 'react';
import './TrackReport.css';

const reportStatus = {
    1: 'Unsorted',
    2: 'Under Examine',
    3: 'Sorted'
};

const reports = [
    { id: 'R001', status: reportStatus[1] },
    { id: 'R002', status: reportStatus[2] },
    { id: 'R003', status: reportStatus[3] },
    { id: 'R004', status: reportStatus[1] },
    { id: 'R005', status: reportStatus[2] }
];

function TrackReport() {
    const [reportId, setReportId] = useState('');
    const [statusResult, setStatusResult] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const report = reports.find(r => r.id === reportId.trim());

        if (!report) {
            setStatusResult('Report ID not found. Please try again.');
            return;
        }

        const status = report.status;
        const steps = Object.values(reportStatus);

        let trackerHTML = '<div class="tracker-steps">';
        steps.forEach(step => {
            const completed = steps.indexOf(step) <= steps.indexOf(status);
            trackerHTML += `
                <div class="tracker-step ${completed ? 'completed' : 'not-completed'}">
                    <span>${step}</span>
                </div>
            `;
        });
        trackerHTML += '</div>';

        setStatusResult(trackerHTML);
    };

    return (
        <div>
            
            <main>
                <div className="card">
                    <h2>Track Your Issue</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="reportId">Report ID(eg: R002):</label>
                        <input 
                            type="text" 
                            id="reportId" 
                            value={reportId}
                            onChange={(e) => setReportId(e.target.value)}
                            required 
                        />
                        <button type="submit">Check Status</button>
                    </form>
                    <div id="trackerResult" className="tracker-result" dangerouslySetInnerHTML={{ __html: statusResult }}>
                    </div>
                </div>
            </main>
           
        </div>
    );
}

export default TrackReport;