import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../constants/config';

/**
 * API client with interceptors for Authorization.
 */
const api = {
  baseURL: CONFIG.API_URL,

  async getHeaders() {
    const token = await AsyncStorage.getItem('userToken');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  async get<T>(endpoint: string): Promise<T> {
    const headers = await this.getHeaders();
    const res = await fetch(`${this.baseURL}${endpoint}`, { headers });
    
    // Parse JSON
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `API error: ${res.status}`);
    }
    return data;
  },

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const headers = await this.getHeaders();
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    
    // Parse JSON
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `API error: ${res.status}`);
    }
    return data;
  },
};

export default api;
