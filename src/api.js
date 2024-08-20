import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const register = async (username, password) => {
  try {
    return await api.post('/register', { username, password });
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    return await api.post('/login', { username, password });
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const getQuotes = async (token) => {
  try {
    return await api.get('/quotes', { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

export const createQuote = async (quote, token) => {
  try {
    return await api.post('/quotes', quote, { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    console.error('Error creating quote:', error);
    throw error;
  }
};

export const updateQuote = async (id, quote, token) => {
  try {
    return await api.put(`/quotes/${id}`, quote, { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    console.error('Error updating quote:', error);
    throw error;
  }
};

export const deleteQuote = async (id, token) => {
  try {
    return await api.delete(`/quotes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    console.error('Error deleting quote:', error);
    throw error;
  }
};
