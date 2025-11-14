import React from 'react';
import './MetricCard.css';

const MetricCard = ({ title, value, type = 'default' }) => {
    return (
        <div className={`metric-card ${type}`}>
            <h3 className="metric-title">{title}</h3>
            <div className="metric-value">{value}</div>
        </div>
    );
};

export default MetricCard;