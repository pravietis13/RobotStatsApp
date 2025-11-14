import React from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';
import './RunsTable.css';

const RunsTable = ({ runs }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleString('ru-RU');
    };

    const formatId = (id) => {
        return id.substring(0, 8) + '...';
    };

    return (
        <div className="table-container">
            <table className="runs-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя робота</th>
                    <th>Время начала</th>
                    <th>Время окончания</th>
                    <th>Статус</th>
                    <th>Сэкономлено (мин)</th>
                    <th>Ошибка</th>
                </tr>
                </thead>
                <tbody>
                {runs.map((run) => (
                    <tr key={run.id}>
                        <td className="id-cell" title={run.id}>
                            {formatId(run.id)}
                        </td>
                        <td>{run.robotName}</td>
                        <td>{formatDate(run.startTime)}</td>
                        <td>{formatDate(run.endTime)}</td>
                        <td>
                            <StatusBadge status={run.status} />
                        </td>
                        <td>{run.savedTime.split('.')[0] || 0}</td>
                        <td className="error-cell" title={run.errorMessage}>
                            {run.errorMessage || '-'}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RunsTable;