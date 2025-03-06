import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../api/userApi'; // RTK Query hook

function Login({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [logoutMessage, setLogoutMessage] = useState('');
    const [loginUser, { isLoading, isError, error, isSuccess }] = useLoginUserMutation(); // Added isSuccess for success handling

    const location = useLocation();
    const navigate = useNavigate();

    // Check for logout message in URL on page load
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('message') === 'logout-success') {
            setLogoutMessage('You have successfully logged out.');
        }
    }, [location]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData).unwrap();  // RTK Query mutation

            if (response && response.user) {
                alert('Login successful!');
                localStorage.setItem('userId', response.user.id);
                localStorage.setItem('token', response.token); // Save token if required

                setIsLoggedIn(true); // Notify parent component (App.js) about login status
                navigate("/tasks"); // Navigate to tasks page after login
            } else {
                alert('Login failed!');
            }
        } catch (err) {
            alert('Login error: ' + (err?.data?.message || 'Invalid credentials'));
        }
    };

    useEffect(() => {
        if (isSuccess) {
            // On successful login, you might want to trigger any actions or redirect here.
            console.log('Login successful:', isSuccess);
        }
    }, [isSuccess]);

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            {logoutMessage && (
                <div style={styles.logoutMessage}>{logoutMessage}</div>
            )}

            {isError && (
                <div style={styles.errorMessage}>
                    Login Failed: {error?.data?.message || 'Please try again'}
                </div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button} disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        width: '300px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    input: {
        padding: '10px',
        fontSize: '14px'
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
    },
    logoutMessage: {
        color: 'green',
        marginBottom: '10px',
        fontWeight: 'bold'
    },
    errorMessage: {
        color: 'red',
        marginBottom: '10px'
    }
};

export default Login;
