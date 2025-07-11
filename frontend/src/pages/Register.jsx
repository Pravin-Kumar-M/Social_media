import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const generateUserId = () => {
        const timestamp = Date.now().toString().slice(-6);
        return 'USER' + timestamp;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const userId = generateUserId();
        const passHint = password.slice(0, 3).toLowerCase();

        try {
            await axios.post('http://localhost:5000/register', {
                user_id: userId,
                name,
                email,
                password,
                pass_hint: passHint
            });
            toast.success("Registration successful! 🎉");
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (err) {
            toast.error("Registration failed. Try again 💔");
        }
    };

    return (
        <div className="login-container">
            <ToastContainer position="top-center" autoClose={2500} />
            <div className="login-card shadow">
                <h2 className="text-center mb-4 text-primary fw-bold">Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control rounded-pill p-3"
                            placeholder="Your Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control rounded-pill p-3"
                            placeholder="Your Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="form-control rounded-pill p-3"
                            placeholder="Your Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-pill fw-bold">
                        Register
                    </button>
                </form>
                <p className="text-center mt-3 mb-0 text-muted">
                    Already have an account? <a href="/" className="text-decoration-none">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
