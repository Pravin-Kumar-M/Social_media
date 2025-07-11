import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './pages.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/login", {
                email,
                password,
            });

            localStorage.setItem('user', JSON.stringify(response.data));
            toast.success("Login successful! 🎉");

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1500);
        } catch (err) {
            const errorData = err.response?.data;

            if (typeof errorData === 'object' && errorData?.hint) {
                toast.error(`${errorData.error} Hint: ${errorData.hint}`);
            } else {
                toast.error("Login failed 💔");
            }
        }
    };

    return (
        <div className="login-container">
            <ToastContainer position="top-center" autoClose={2500} />
            <div className="login-card shadow">
                <h2 className="text-center mb-4">Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control rounded-pill glow-input p-3"
                            id="floatingEmail"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />

                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="form-control rounded-pill glow-input p-3"
                            id="floatingPassword"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />

                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-pill">Login</button>
                </form>
                <p className="text-center mt-4">
                    Don’t have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
