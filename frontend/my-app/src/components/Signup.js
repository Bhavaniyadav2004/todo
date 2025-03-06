import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '../api/userApi';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate(); // Initialize navigation hook
    const [createUser] = useCreateUserMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === 'password') {
            validatePassword(e.target.value);
        } else if (e.target.name === 'email') {
            validateEmail(e.target.value);
        }
    };

    const validatePassword = (password) => {
        const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!strongPasswordRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters, include an uppercase letter, a number, and a special character.');
        } else {
            setPasswordError('');
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccessMessage('');
        setSubmitError('');

        if (passwordError) {
            alert('Please fix the password requirements before submitting.');
            return;
        }

        try {
            const response = await createUser(formData).unwrap();
            console.log('User created:', response);
            setSuccessMessage('Account created successfully!');
            setSubmitError('');
        } catch (err) {
            setSubmitError(err?.data?.message || 'Failed to create user');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                {emailError && <p style={styles.error}>{emailError}</p>}

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                {passwordError && <p style={styles.error}>{passwordError}</p>}

                <button type="submit" style={styles.button}>Signup</button>
            </form>

            {submitError && <p style={styles.error}>{submitError}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}
        </div>
    );
}

const styles = {
    container: {
        width: '320px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        backgroundColor: '#fff'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    input: {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    },
    button: {
        padding: '10px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '4px'
    },
    error: {
        color: 'red',
        fontSize: '12px',
        margin: '0'
    },
    success: {
        color: 'green',
        fontSize: '14px',
        fontWeight: 'bold',
        marginTop: '10px'
    }
};

export default Signup;
