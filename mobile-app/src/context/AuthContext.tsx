import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CLIENT';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // In a real app, we would check for a stored token here
  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Point to our Next.js backend (using a local IP for emulator or a tunnel)
      // For now, since we are in the same environment, we use a placeholder or local IP
      const response = await axios.post('http://192.168.1.100:3000/api/auth/login', {
        email,
        password,
        redirect: false,
      });

      if (response.data?.user) {
        setUser(response.data.user);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
