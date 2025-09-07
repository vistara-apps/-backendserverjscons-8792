import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} loading={loading} />
      )}
    </div>
  );
}

export default App;