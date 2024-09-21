import React from 'react';
import './FutureIdea.css';

const futureFeatures = [
    {
        title: 'Virtual Inspection with AR and 3D Model',
        description: 'Implementing augmented reality and 3D models for virtual inspections.',
        image: 'images/ar-3d-model.jpg'
    },
    {
        title: 'Integration with Drones',
        description: 'Utilizing drones for enhanced inspection and data collection.',
        image: 'images/drones.jpg'
    },
    {
        title: 'Digital Twins',
        description: 'Creating digital twins for real-time monitoring and management.',
        image: 'images/digital-twins.jpg'
    },
    {
        title: 'Robotic Process Automation (RPA)',
        description: 'Automating routine tasks using robotic process automation.',
        image: 'images/rpa.jpg'
    },
    {
        title: 'Predictive Maintenance',
        description: 'Using AI and machine learning for predictive maintenance of assets.',
        image: 'images/predictive-maintenance.jpg'
    },
    {
        title: 'Smart Sensors',
        description: 'Implementing smart sensors for real-time data collection and analysis.',
        image: 'images/smart-sensors.jpg'
    },
];

const FutureScope = () => {
    return (
        <div className="container">
            <h1>Future Scope</h1>
            <div className="cards">
                {futureFeatures.map((feature, index) => (
                    <div className="card" key={index}>
                        <img src={feature.image} alt={feature.title} />
                        <div className="card-content">
                            <h2 className="card-title">{feature.title}</h2>
                            <p className="card-description">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FutureScope;