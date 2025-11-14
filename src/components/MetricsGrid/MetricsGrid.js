import React from 'react';
import MetricCard from '../MetricCard/MetricCard';
import './MetricsGrid.css';

const MetricsGrid = ({ stats }) => {
    const metrics = [
        {
            title: 'Всего запусков',
            value: stats.totalRuns,
            type: 'default'
        },
        {
            title: 'Успешных',
            value: stats.successful,
            type: 'success'
        },
        {
            title: 'С ошибками',
            value: stats.failed,
            type: 'error'
        },
        {
            title: 'В работе',
            value: stats.running,
            type: 'running'
        },
        {
            title: 'Сэкономлено времени',
            value: `${stats.totalSavedTime}`.split('.')[0],
            type: 'time'
        }
    ];

    return (
        <div className="metrics-grid">
            {metrics.map((metric, index) => (
                <MetricCard
                    key={index}
                    title={metric.title}
                    value={metric.value}
                    type={metric.type}
                />
            ))}
        </div>
    );
};

export default MetricsGrid;