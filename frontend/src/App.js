import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './components/Profile';
import Message from './components/Message';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './components/Header.css'
import Settings from './pages/Settings';
import { ThemeProvider } from './pages/themeContext';

function App() {
  const isLoggedIn = !!localStorage.getItem('user');

  return (

    <ThemeProvider>

      <Router>
        <>
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar
          />


          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
            <Route path="/message" element={isLoggedIn ? <Message /> : <Navigate to="/" />} />
            <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/" />} />

          </Routes>
        </>
      </Router>
    </ThemeProvider>
  );
}

export default App;
