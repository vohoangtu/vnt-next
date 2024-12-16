import { apiService } from './apiService';
import { endpoints } from '@/configs/endpoints';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    permissions?: string[];
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      console.log(endpoints.auth.login, credentials);
      const response = await apiService.post<LoginResponse>(endpoints.auth.login, credentials);
      console.log(response);
      if (response.access_token) {
        // Store token in HTTP-only cookie
        Cookies.set('access_token', response.access_token, { 
          expires: credentials.remember ? 7 : 1, // 7 days if remember, 1 day if not
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        // Store user data
        if (credentials.remember) {
          localStorage.setItem('user', JSON.stringify({ user: response.user }));
        } else {
          sessionStorage.setItem('user', JSON.stringify({ user: response.user }));
        }
      }
      return response;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  async logout(): Promise<void> {
    try {
      // Call logout endpoint
      await apiService.post(endpoints.auth.logout);
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with cleanup even if API call fails
    } finally {
      // Clean up all auth-related data
      this.clearAuthData();
      window.location.href = '/login';
    }
  },

  clearAuthData(): void {
    // Clear cookies
    Cookies.remove('access_token');
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    
    // Clear sessionStorage
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('lastVisitedPath');
    
    // Clear any other auth-related data
    try {
      // Attempt to clear all auth-related cookies
      const cookies = Cookies.get();
      for (const cookie in cookies) {
        if (cookie.toLowerCase().includes('auth') || 
            cookie.toLowerCase().includes('token') ||
            cookie.toLowerCase().includes('session')) {
          Cookies.remove(cookie);
        }
      }
    } catch (error) {
      console.error('Error clearing cookies:', error);
    }
  },

  getCurrentUser() {
    const token = Cookies.get('access_token');
    // Try localStorage first, then sessionStorage
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (!token || !userStr) {
      return null;
    }

    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    const token = Cookies.get('access_token');
    return !!(token && user?.user);
  },

  getAuthToken(): string | null {
    return Cookies.get('access_token');
  }
};
