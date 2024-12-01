import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: {
    email: string;
    username?: string;
    _id?: string;
  } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const API_URL = process.env.VITE_API_URL;
console.log('Current API URL:', API_URL); // Debug log

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        console.log('Attempting login with API URL:', API_URL);
        
        try {
          const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          console.log('Login response status:', response.status);
          
          const data = await response.json();
          console.log('Login response data:', data);

          if (!response.ok) {
            throw new Error(data.message || 'Login failed');
          }

          set({ user: data.user, token: data.token, isAuthenticated: true });
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        } catch (error) {
          console.error('Login error details:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            apiUrl: API_URL
          });
          throw error;
        }
      },
      register: async (username: string, email: string, password: string) => {
        console.log('Attempting registration with API URL:', API_URL);
        
        try {
          const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
          });

          console.log('Register response status:', response.status);
          
          const data = await response.json();
          console.log('Register response data:', data);

          if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
          }

          set({ user: data.user, token: data.token, isAuthenticated: true });
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        } catch (error) {
          console.error('Registration error details:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            apiUrl: API_URL
          });
          throw error;
        }
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);