// src/components/Sidebar.jsx
import React, { useState } from 'react';
import './Header.css';



function Sidebar() {
    const [notificationCount, setNotificationCount] = useState(3); // replace 3 with dynamic value
    return (
        <div className="sidebar d-flex flex-column p-3">
            <h4 className="text-white mb-4">MySocial</h4>

            <a href="/" className="sidebar-link active">
                <i className="bi bi-house-door-fill me-2"></i> Home
            </a>
            <a href="/profile" className="sidebar-link">
                <i className="bi bi-person-fill me-2"></i> Profile
            </a>
            <a href="/message" className="sidebar-link">
                <i className="bi bi-chat-dots-fill me-2"></i> Messages
            </a>
            <a href="#" className="sidebar-link d-flex justify-content-between align-items-center">
                <span>
                    <i className="bi bi-bell-fill me-2"></i> Notifications
                </span>

                {/* Red Dot if notifications exist */}
                {notificationCount > 0 && (
                    <span
                        className="bg-danger rounded-circle"
                        style={{
                            width: '10px',
                            height: '10px',
                            display: 'inline-block',
                        }}
                    ></span>
                )}
            </a>

            <a href="/settings" className="sidebar-link">
                <i className="bi bi-gear-fill me-2"></i> Settings
            </a>
        </div>
    );
}

export default Sidebar;
