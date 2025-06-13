import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

export default function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={() => window.location.href = '/dashboard'} />} />
        <Route path="/signup" element={<Signup onSignup={() => window.location.href = '/login'} />} />
        <Route path="/dashboard" element={token ? <Dashboard onLogout={() => window.location.href = '/login'} /> : <Navigate to="/login" />} />
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </Router>
  );
}
