import React from 'react';
// import './StatusBadge.css';

const StatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
        switch(status) {
            case 1:
                return { text: 'В работе', className: 'status-running' };
            case 2:
                return { text: 'Успешно', className: 'status-success' };
            case 3:
                return { text: 'Ошибка', className: 'status-error' };
        }
    };

    const { text, className } = getStatusConfig(status);

    return (
        <span className={`status-badge ${className}`}>
      {text}
    </span>
    );
};

export default StatusBadge;