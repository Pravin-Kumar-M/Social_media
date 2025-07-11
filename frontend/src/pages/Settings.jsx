import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import { ThemeContext } from './themeContext';

function Settings() {


    const [username, setUsername] = useState('MySocial');
    const [email, setEmail] = useState('user@example.com');
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const [notifications, setNotifications] = useState(true);

    const handleSave = () => {
        // Add your API call here to save settings
        alert("Settings saved!");
    };

    return (
        <>
            <Header />
            <div className="container mt-4">
                <div className="card shadow-sm p-4">
                    <h3 className="mb-4">Settings</h3>

                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-check form-switch mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            id="darkModeSwitch"
                        />
                        <label className="form-check-label" htmlFor="darkModeSwitch">
                            Dark Mode
                        </label>
                    </div>
                    <div className="form-check form-switch mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={notifications}
                            onChange={() => setNotifications(!notifications)}
                            id="notificationsSwitch"
                        />
                        <label className="form-check-label" htmlFor="notificationsSwitch">
                            Email Notifications
                        </label>
                    </div>

                    <button className="btn btn-primary" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    );
}

export default Settings;
