import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalRuns: 0,
        successful: 0,
        failed: 0,
        running: 0,
        totalSavedTime: 0
    });

    const [runs, setRuns] = useState([]);
    const [loading, setLoading] = useState(true);

    // Функция для загрузки статистики
    const fetchStats = async () => {
        try {
            const response = await fetch('/api/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Ошибка загрузки статистики:', error);
        }
    };

    // Функция для загрузки списка запусков
    const fetchRuns = async () => {
        try {
            const response = await fetch('/api/stats/runs');
            const data = await response.json();
            setRuns(data);
        } catch (error) {
            console.error('Ошибка загрузки запусков:', error);
        }
    };

    // Загрузка данных при монтировании и обновление каждые 5 секунд
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchStats(), fetchRuns()]);
            setLoading(false);
        };

        loadData();

        const interval = setInterval(loadData, 5000);
        return () => clearInterval(interval);
    }, []);

    // Функция для получения текстового статуса
    const getStatusText = (status) => {
        switch(status) {
            case 1: return 'В работе';
            case 2: return 'Успешно';
            case 3: return 'Ошибка';
            default: return 'Неизвестно';
        }
    };

    // Функция для получения класса статуса
    const getStatusClass = (status) => {
        switch(status) {
            case 1: return 'status-running';
            case 2: return 'status-success';
            case 3: return 'status-error';
            default: return 'status-unknown';
        }
    };

    if (loading) {
        return <div className="loading">Загрузка данных...</div>;
    }

    return (
        <div className="dashboard">
            <h1>Статистика роботов</h1>

            {/* Карточки с метриками */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <h3>Всего запусков</h3>
                    <div className="metric-value">{stats.totalRuns}</div>
                </div>

                <div className="metric-card success">
                    <h3>Успешных</h3>
                    <div className="metric-value">{stats.successful}</div>
                </div>

                <div className="metric-card error">
                    <h3>С ошибками</h3>
                    <div className="metric-value">{stats.failed}</div>
                </div>

                <div className="metric-card running">
                    <h3>В работе</h3>
                    <div className="metric-value">{stats.running}</div>
                </div>

                <div className="metric-card time">
                    <h3>Сэкономлено времени</h3>
                    <div className="metric-value">{stats.totalSavedTime.split('.')[0]}</div>
                </div>
            </div>

            {/* Таблица запусков */}
            <div className="runs-section">
                <h2>История запусков</h2>
                <div className="table-container">
                    <table className="runs-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя робота</th>
                            <th>Время начала</th>
                            <th>Время окончания</th>
                            <th>Статус</th>
                            <th>Сэкономлено</th>
                            <th>Ошибка</th>
                        </tr>
                        </thead>
                        <tbody>
                        {runs.map((run) => (
                            <tr key={run.id}>
                                <td className="id-cell">{run.id.substring(0, 8)}...</td>
                                <td>{run.robotName}</td>
                                <td>{new Date(run.startTime).toLocaleString()}</td>
                                <td>{run.endTime ? new Date(run.endTime).toLocaleString() : '-'}</td>
                                <td>
                    <span className={`status-badge ${getStatusClass(run.status)}`}>
                      {getStatusText(run.status)}
                    </span>
                                </td>
                                <td>{run.savedTime.split('.')[0] || 0}</td>
                                <td className="error-cell">{run.errorMessage || '-'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;