import React, { useState } from 'react';
import { login } from '../api';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            const { token, user } = await login(form.email, form.password);
            localStorage.setItem('token', token);
            localStorage.setItem('userId', user);
            onLogin();
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    }

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {['email', 'password'].map((field, i) => (
                    <input
                        key={i}
                        type={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={form[field]}
                        onChange={e => setForm({ ...form, [field]: e.target.value })}
                        required
                    />
                ))}
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}

                <p style={{ textAlign: 'center' }}>Don't have an account? <Link to='/signup'>Signup</Link></p>
            </form>
        </div>
    );
}
