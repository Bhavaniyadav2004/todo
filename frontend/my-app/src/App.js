import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Tasks from './components/Tasks';
import UserList from './components/UserList';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Test Backend Connection
    const testConnection = async () => {
        try {
            const response = await axios.get('https://localhost:5005/api');  // Make sure this is correct
            console.log('✅ Backend is connected:', response.data);
        } catch (error) {
            console.error('❌ Backend connection failed:', error.message);
        }
    };

    useEffect(() => {
        const savedLogin = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(savedLogin);
        testConnection();
    }, []);

    // ✅ Added effect to track `isLoggedIn` and store in localStorage
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    return (
        <Router>
            <div>
                <Navbar isLoggedIn={isLoggedIn} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/admin/users" element={<UserList />} />
                    <Route 
                        path="/tasks" 
                        element={isLoggedIn ? <Tasks /> : <Login setIsLoggedIn={setIsLoggedIn} />} 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
