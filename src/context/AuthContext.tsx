'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { authService } from '@/services/authService';
import { useRouter, usePathname } from 'next/navigation';

// Types and Interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions?: string[];
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface AuthError extends Error {
  code?: string;
  details?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<any>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
  loginPath?: string;
  homePath?: string;
}

// Constants
const DEFAULT_LOGIN_PATH = '/login';
const DEFAULT_HOME_PATH = '/dashboard';
const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unexpected error occurred',
};

// Create context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  checkAuth: async () => {},
  updateUser: async () => {},
  hasPermission: () => false,
});

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export function AuthProvider({ 
  children, 
  loginPath = DEFAULT_LOGIN_PATH,
  homePath = DEFAULT_HOME_PATH,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastAuthCheck, setLastAuthCheck] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();

  // Memoized authentication status
  const isAuthenticated = useMemo(() => !!user, [user]);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    try {
      // Prevent multiple simultaneous auth checks
      const now = Date.now();
      if (now - lastAuthCheck < 1000) return;
      setLastAuthCheck(now);

      const currentUser = await authService.getCurrentUser();
      setUser(currentUser?.user || null);
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      if (pathname !== loginPath) {
        router.push(loginPath);
      }
    } finally {
      setLoading(false);
    }
  }, [lastAuthCheck, loginPath, pathname, router]);

  // Handle login
  const login = useCallback(async (email: string, password: string, remember: boolean = false) => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password, remember });
      setUser(response.user);
      router.push(homePath);
      return response;
    } catch (error: any) {
      const authError: AuthError = new Error(
        error.message || AUTH_ERROR_MESSAGES.UNKNOWN_ERROR
      );
      authError.code = error.code;
      authError.details = error.details;
      throw authError;
    } finally {
      setLoading(false);
    }
  }, [homePath, router]);

  // Handle logout
  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      router.push(loginPath);
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API fails
      setUser(null);
      router.push(loginPath);
    }
  }, [loginPath, router]);

  // Update user data
  const updateUser = useCallback(async (userData: Partial<User>) => {
    try {
      setLoading(true);
      // Implement user update API call here if needed
      setUser(prev => prev ? { ...prev, ...userData } : null);
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Check permissions
  const hasPermission = useCallback((permission: string): boolean => {
    return user?.permissions?.includes(permission) || false;
  }, [user]);

  // Initial auth check
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Periodic auth check (every 5 minutes)
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(checkAuth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkAuth, isAuthenticated]);

  // Provide memoized context value
  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    updateUser,
    hasPermission,
  }), [user, loading, isAuthenticated, login, logout, checkAuth, updateUser, hasPermission]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
