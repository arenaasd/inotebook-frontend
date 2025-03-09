import React from 'react';

export const Alert = ({ alert }) => {
    if (!alert) return null;
    
    const getBgColor = (type) => {
        switch (type) {
            case "success": return "#28a745";
            case "danger": return "#dc3545";
            case "warning": return "#ffc107";
            case "info": return "#17a2b8";
            default: return "#333";
        }
    };

    return (
        <div className="alert text-white" style={{ backgroundColor: getBgColor(alert.type), position: "fixed", top: 0, width: "100%", zIndex: 1000 }} role="alert">
            {alert.msg}
        </div>
    );
};
