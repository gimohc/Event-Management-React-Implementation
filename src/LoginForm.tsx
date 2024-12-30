// LoginForm.tsx
import React, { useState } from 'react';
import { securityKey } from './App'; // Make sure the securityKey is correctly imported

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set(
            'Authorization',
            `Basic ${btoa(`user:${securityKey}`)}` // Interpolating the securityKey correctly
        );

        try {
            const response = await fetch('http://localhost:8080/users/verifyUser', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    username,
                    password
                }),
                credentials: 'include' // Include credentials in the fetch call
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || 'Network response was not ok');
            } else {
                setMessage(data.message || 'Validation successful');
            }
        } catch (error) {
            console.error('Login request failed:', error);
            setMessage('Login request failed');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Login</button>
                <p>{message}</p>
            </form>
        </>
    );
};

export default LoginForm;
