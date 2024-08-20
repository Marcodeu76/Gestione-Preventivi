import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api';  // Assicurati che questi siano configurati correttamente

const AuthPage = ({ setToken, isLoginMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await login(username, password);  // Assumi che `login` ritorni userCredential
      const token = userCredential.user.stsTokenManager.accessToken;  // Estrai il token
      if (token) {
        setToken(token);  // Salva il token nello stato
        console.log('Login successful, token set:', token);
        navigate('/quotes');  // Reindirizza alla pagina quotes
      } else {
        console.error('Login failed: no token received');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async () => {
    try {
      await register(username, password);
      console.log('Registration successful, logging in...');
      handleLogin();  // Effettua il login automatico dopo la registrazione
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={isLoginMode ? handleLogin : handleRegister}>
        {isLoginMode ? 'Login' : 'Register'}
      </button>
      <button onClick={() => navigate(isLoginMode ? '/register' : '/login')}>
        {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default AuthPage;
