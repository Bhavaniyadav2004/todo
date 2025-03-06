import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear login data (e.g., token in localStorage)
        localStorage.removeItem('token');
        setIsLoggedIn(false);

        // Redirect to /login with a message in the URL
        navigate('/login?message=logout-success');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">To-Do</Link>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>

                        {isLoggedIn ? (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/tasks">Tasks</Link></li>
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
