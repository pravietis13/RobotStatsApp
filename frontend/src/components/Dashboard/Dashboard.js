import React, { useState, useEffect } from 'react';
import MetricsGrid from '../MetricsGrid/MetricsGrid';
import RunsTable from '../RunsTable/RunsTable';
import { apiService } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalRuns: 0,
        successful: 0,
        failed: 0,
        running: 0,
        totalSavedTime: 0
    });

    const [runs, setRuns] = useState([]);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            setError(null);
            setStats(await apiService.getStats());
            setRuns(await apiService.getRuns());
        } catch (err) {
            setError(err.message);
            console.error('Ошибка загрузки данных:', err);
        }
    };

    useEffect(() => {
        loadData();

        const interval = setInterval(loadData, 5000);
        return () => clearInterval(interval);
    }, []);

    if (error) {
        return (
            <div className="error-message">
                <h2>Ошибка загрузки данных</h2>
                <p>{error}</p>
            </div>
        );
    }


    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Статистика запусков</h1>
                <div className="last-update">
                    Последнее обновление: {new Date().toLocaleTimeString()}
                </div>
            </header>

            <MetricsGrid stats={stats}/>

            <section className="runs-section">
                <h2>История запусков</h2>
                <RunsTable runs={runs} />
            </section>
        </div>
    );
};

export default Dashboard;