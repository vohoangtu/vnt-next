'use client';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import Topbar from './Topbar';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import Toast from '@/components/ui/Toast';


export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(true);
  const { isAuthenticated } = useAuth();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const { toasts, removeMessage } = useNotification();
  return (
    <>
    
      {isAuthenticated ? (
        <div className="dashboard-layout">
          <Topbar onToggleSidebar={toggleSidebar} />
          <div className="content-wrapper">
            <Toast toasts={toasts} removeToast={removeMessage} />
            <Sidebar className={showSidebar ? 'show' : ''} />
            <main className="main-content">
              <div className="p-4">
                {children}
              </div>
            </main>
          </div>
        </div>
      ) : (
       
          <main>
             <Toast toasts={toasts} removeToast={removeMessage} />
              {children}
          </main>
       
      )}
    </>
  );
}
