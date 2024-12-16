'use client'
import React from 'react';
import { useNotification } from '@/context/NotificationContext';
import Toast from '@/components/ui/Toast';

const Layout: React.FC = ({ children }) => {
  const { toasts, removeMessage } = useNotification();

  return (
    <div>
      <Toast toasts={toasts} removeToast={removeMessage} />
      {children}
    </div>
  );
};

export default Layout;