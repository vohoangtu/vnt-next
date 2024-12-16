'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ToastMessage } from '@/types/ToastMessageType';
import { Variant } from '@/types/Variant';

interface NotificationContextType {
  toasts: ToastMessage[];
  showMessage: (msg: string, variant: Variant) => void;
  removeMessage: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

let nextId = 0;

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showMessage = (msg: string, variant: 'success' | 'error' | 'warning' | 'info') => {
    setToasts((prevToasts) => [...prevToasts, { id: nextId++, message: msg, variant }]);
  };

  const removeMessage = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ toasts, showMessage, removeMessage }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};