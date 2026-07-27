import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return {
      id: 'usr_8921',
      name: 'Tamanpreet Singh',
      email: 'taman.singh@university.edu',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      university: 'Tech Institute of Science & Tech',
      degree: 'B.Tech Computer Science & Engineering',
      graduationYear: 2026,
      targetRole: 'datascientist',
      streakDays: 14,
      savedResumesCount: 2,
      isVerified: true
    };
  });

  const [savedHistory, setSavedHistory] = useState(() => {
    const saved = localStorage.getItem('user_history');
    return saved ? JSON.parse(saved) : [
      { id: 'h1', type: 'ATS Resume Scan', score: '88%', date: '2026-07-25', title: 'Data Engineer Resume v2' },
      { id: 'h2', type: 'Mock Interview', score: '92%', date: '2026-07-24', title: 'Full Stack Technical Round' },
      { id: 'h3', type: 'CGPA Sim', score: '8.95 CGPA', date: '2026-07-20', title: 'Semester 5 Forecast' }
    ];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user_session');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('user_history', JSON.stringify(savedHistory));
  }, [savedHistory]);

  const login = (email, password) => {
    const user = {
      id: 'usr_' + Math.floor(Math.random() * 9000 + 1000),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      university: 'Tech Institute of Science & Tech',
      degree: 'B.Tech Computer Science',
      graduationYear: 2026,
      targetRole: 'fullstack',
      streakDays: 1,
      savedResumesCount: 1,
      isVerified: true
    };
    setCurrentUser(user);
    return user;
  };

  const signup = (name, email, password) => {
    const user = {
      id: 'usr_' + Math.floor(Math.random() * 9000 + 1000),
      name,
      email,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      university: 'State University of Technology',
      degree: 'B.Tech IT',
      graduationYear: 2026,
      targetRole: 'fullstack',
      streakDays: 1,
      savedResumesCount: 0,
      isVerified: true
    };
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updates) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updates
    }));
  };

  const addHistoryItem = (item) => {
    setSavedHistory(prev => [
      { id: 'h_' + Date.now(), date: new Date().toISOString().split('T')[0], ...item },
      ...prev
    ]);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isLoggedIn: !!currentUser,
      login,
      signup,
      logout,
      updateProfile,
      savedHistory,
      addHistoryItem
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
