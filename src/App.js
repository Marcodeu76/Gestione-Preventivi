import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';  
import './App.css';
import Home from './components/Home';
import Quotes from './components/Quotes';
import HowItWorks from './components/HowItWorks';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      navigate('/quotes');
    } else {
      localStorage.removeItem('token');
    }
    console.log('Token set or removed:', token); 
  }, [token, navigate]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestione Preventivi</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/how-it-works">Come Funziona</Link>
          {token && <Link to="/quotes">Quotes</Link>}
          {!token && <Link to="/login">Login</Link>}
          {!token && <Link to="/register">Register</Link>}
          {token && <Link to="/logout" onClick={() => setToken(null)}>Logout</Link>}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register setToken={setToken} />} />
          <Route path="/quotes" element={token ? <Quotes token={token} /> : <Login setToken={setToken} />} />
          <Route path="/logout" element={<Login setToken={setToken} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
