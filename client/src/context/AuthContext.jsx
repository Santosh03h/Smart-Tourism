import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await API.get('/auth/me');
        if (data.success) {
          const savedProfile = localStorage.getItem('user_profile');
          const localData = savedProfile ? JSON.parse(savedProfile) : {};
          setUser({ ...data.user, ...localData });
        } else {
          logout();
        }
      } catch (err) {
        console.error('Failed to load user session', err);
        const savedProfile = localStorage.getItem('user_profile');
        const localData = savedProfile ? JSON.parse(savedProfile) : {};
        // Fallback demo user if backend is unavailable or token invalid
        setUser({
          _id: 'demo001',
          name: 'Rahul Sharma',
          email: 'demo@tourism.com',
          travelType: 'Solo',
          preferredLanguage: 'English',
          emergencyContact: { name: 'Priya Sharma', phone: '+91-9876543211', relation: 'Sister' },
          role: 'user',
          ...localData
        });
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, [token]);

  const login = async (email, password) => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (formData) => {
    try {
      const { data } = await API.post('/auth/register', formData);
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_profile');
    setToken(null);
    setUser(null);
  };

  const updateUserProfile = (updatedUser) => {
    setUser(prev => {
      const next = { ...prev, ...updatedUser };
      localStorage.setItem('user_profile', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
