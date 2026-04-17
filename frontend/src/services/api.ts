import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../constants/config';

let firebaseAuthFactory: any = null;

const getFirebaseAuth = () => {
  if (!firebaseAuthFactory) {
    firebaseAuthFactory = require('@react-native-firebase/auth').default;
  }

  return firebaseAuthFactory();
};

/**
 * API client with interceptors for Authorization.
 */
const api = {
  baseURL: CONFIG.API_URL,

  async getHeaders() {
    let token: string | null = null;
    
    try {
      // Get Firebase ID token
      const currentUser = getFirebaseAuth().currentUser;
      if (currentUser) {
        token = await currentUser.getIdToken(true); // Force refresh
      }
    } catch (error) {
      console.warn('Failed to get Firebase ID token:', error);
      // Fallback to stored token
      token = await AsyncStorage.getItem('userToken');
    }

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
    let res: Response;
    try {
      res = await fetch(`${this.baseURL}${endpoint}`, { headers });
    } catch (error: any) {
      throw new Error(
        `Cannot reach backend at ${this.baseURL}. Check that the server is running and that your phone can access this IP.`
      );
    }
    
    const contentType = res.headers.get('content-type') || '';
    const rawBody = await res.text();
    let data: any = null;

    if (rawBody) {
      if (contentType.includes('application/json')) {
        data = JSON.parse(rawBody);
      } else {
        throw new Error(
          `Expected JSON from ${endpoint}, but received ${contentType || 'text/html'}. Check the backend URL and route.`
        );
      }
    }

    if (!res.ok) {
      throw new Error(data?.error || data?.message || `API error: ${res.status}`);
    }
    return data;
  },

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const headers = await this.getHeaders();
    let res: Response;
    try {
      res = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
    } catch (error: any) {
      throw new Error(
        `Cannot reach backend at ${this.baseURL}. Check that the server is running and that your phone can access this IP.`
      );
    }
    
    const contentType = res.headers.get('content-type') || '';
    const rawBody = await res.text();
    let data: any = null;

    if (rawBody) {
      if (contentType.includes('application/json')) {
        data = JSON.parse(rawBody);
      } else {
        throw new Error(
          `Expected JSON from ${endpoint}, but received ${contentType || 'text/html'}. Check the backend URL and route.`
        );
      }
    }

    if (!res.ok) {
      throw new Error(data?.error || data?.message || `API error: ${res.status}`);
    }
    return data;
  },

  async put<T>(endpoint: string, body: unknown): Promise<T> {
    const headers = await this.getHeaders();
    let res: Response;
    try {
      res = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      });
    } catch (error: any) {
      throw new Error(
        `Cannot reach backend at ${this.baseURL}. Check that the server is running and that your phone can access this IP.`
      );
    }

    const contentType = res.headers.get('content-type') || '';
    const rawBody = await res.text();
    let data: any = null;

    if (rawBody) {
      if (contentType.includes('application/json')) {
        data = JSON.parse(rawBody);
      } else {
        throw new Error(
          `Expected JSON from ${endpoint}, but received ${contentType || 'text/html'}. Check the backend URL and route.`
        );
      }
    }

    if (!res.ok) {
      throw new Error(data?.error || data?.message || `API error: ${res.status}`);
    }
    return data;
  },
};

export default api;

