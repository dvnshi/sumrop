import React, { useEffect } from 'react';
import './Rewards.css';

import { Navbar, Nav, NavItem, NavLink } from 'reactstrap'; // For reactstrap

const RewardsSystem = () => {
    const rewards = [
        { name: 'Gift Voucher', requiredCoins: 100, currentCoins: 50 },
        { name: 'Special Citizen Badge', requiredCoins: 200, currentCoins: 120 },
        { name: 'Bonus Leave Day', requiredCoins: 150, currentCoins: 80 },
        { name: 'Monthly Bonus', requiredCoins: 300, currentCoins: 250 },
        { name: 'Special Staff Reward', requiredCoins: 500, currentCoins: 400 }
    ];

    useEffect(() => {
        renderRewards();
    }, []);

    const renderRewards = () => {
        return rewards.map((reward, index) => (
            <li key={index} className="reward-item">
                <strong>{reward.name}</strong><br />
                <span>Coins Needed: {reward.requiredCoins - reward.currentCoins}</span>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${Math.min((reward.currentCoins / reward.requiredCoins) * 100, 100)}%` }}></div>
                </div>
            </li>
        ));
    };

    return (
        <div>
            
            <main>
                <div className="card-container">
                    <div className="card">
                        <h2>Rewards</h2>
                        <ul id="rewards-list">
                            {renderRewards()}
                        </ul>
                    </div>
                    <div className="card">
                        <h2>Criteria</h2>
                        <ul>
                            <li>Submit justified and unique issues.</li>
                            <li>Ensure the issue status is marked as done.</li>
                            <li>Complete work before the deadline for staff members.</li>
                            <li>Participate in community activities.</li>
                            <li>Provide constructive feedback on resolved issues.</li>
                            <li>Volunteer for city improvement projects.</li>
                            <li>Engage in city clean-up drives.</li>
                            <li>Report illegal activities and hazards.</li>
                            <li>Participate in public meetings and forums.</li>
                            <li>Support local events and campaigns.</li>
                        </ul>
                    </div>
                </div>
            </main>
           
        </div>
    );
};

export default RewardsSystem;
