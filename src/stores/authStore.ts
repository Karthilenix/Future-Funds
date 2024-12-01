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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
          }

          const data = await response.json();
          set({ user: data.user, token: data.token, isAuthenticated: true });
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
      register: async (username: string, email: string, password: string) => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
          }

          const data = await response.json();
          set({ user: data.user, token: data.token, isAuthenticated: true });
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        } catch (error) {
          console.error('Registration error:', error);
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