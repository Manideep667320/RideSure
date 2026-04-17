import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import type { User } from '../types';

interface ApiResponse<T> {
  data: T;
}

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  login: (firebaseToken: string) => Promise<User>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-verify token on start up
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const response = await api.get<ApiResponse<User>>('/auth/me');
          if (response && response.data) {
            setUser(response.data);
          }
        }
      } catch (e) {
        console.warn('Bootstrap auth failed. Token may be expired.');
        await AsyncStorage.removeItem('userToken');
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapAsync();
  }, []);

  const login = async (firebaseToken: string) => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('userToken', firebaseToken);
      
      const response = await api.get<ApiResponse<User>>('/auth/me');
      
      if (response && response.data) {
        setUser(response.data);
        return response.data;
      }

      throw new Error('Login succeeded but user profile is missing.');
    } catch (e) {
      console.error('Login error:', e);
      await AsyncStorage.removeItem('userToken');
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
