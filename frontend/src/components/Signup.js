import React, { useState } from 'react';
import { signup } from '../api';
import './styles.css';
import { Link } from 'react-router-dom';

export default function Signup({ onSignup }) {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            await signup(form.username, form.email, form.password);
            onSignup();
        } catch (err) {
            setError(err.message || 'Signup failed');
        }
    }

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                {['username', 'email', 'password'].map((field, i) => (
                    <input
                        key={i}
                        type={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={form[field]}
                        onChange={e => setForm({ ...form, [field]: e.target.value })}
                        required
                    />
                ))}
                <button type="submit">Sign Up</button>
                {error && <p className="error">{error}</p>}

                <p style={{ textAlign: 'center' }}>Already have an account? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    );
}
