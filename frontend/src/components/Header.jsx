import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';

import './Header.css';

function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/'; // or navigate to login page
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container-fluid">
                <a className="navbar-brand text-white fw-bold fs-4" href="/">
                    MySocial
                </a>

                <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/profile">Profile</a>

                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/message">Messages</a>
                        </li>
                    </ul>

                    {/* Right Profile Section */}
                    {user && (
                        <div className="d-flex align-items-center profile-box">
                            {/* Notification Bell */}
                            <div className="position-relative me-3">
                                <FaBell className="text-white fs-5 pointer" />
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style={{ fontSize: '0.6rem' }}
                                >
                                    3
                                </span>
                            </div>

                            <img
                                src={
                                    user.profile_image
                                        ? `http://localhost:5000/${user.profile_image}`
                                        : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                                }
                                alt="Profile"
                                className="rounded-circle profile-pic me-2"
                            />


                            <span className="username me-3">{user.name}</span>
                            <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;
