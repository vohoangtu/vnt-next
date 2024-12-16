'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Nav } from 'react-bootstrap';

interface MenuItem {
  title: string;
  path: string;
  icon: string;
  children?: MenuItem[];
}

interface SidebarProps {
  className?: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'bi-speedometer2',
  },
  {
    title: 'Tours',
    path: '/dashboard/tours',
    icon: 'bi-compass',
    children: [
      {
        title: 'All Tours',
        path: '/dashboard/tours',
        icon: 'bi-list-ul',
      },
      {
        title: 'Add New Tour',
        path: '/dashboard/tours/new',
        icon: 'bi-plus-circle',
      },
    ],
  },
  {
    title: 'Bookings',
    path: '/dashboard/bookings',
    icon: 'bi-calendar-check',
    children: [
      {
        title: 'All Bookings',
        path: '/dashboard/bookings',
        icon: 'bi-list-ul',
      },
      {
        title: 'New Booking',
        path: '/dashboard/bookings/new',
        icon: 'bi-plus-circle',
      },
    ],
  },
  {
    title: 'Customers',
    path: '/dashboard/customers',
    icon: 'bi-people',
  },
  {
    title: 'Reports',
    path: '/dashboard/reports',
    icon: 'bi-graph-up',
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: 'bi-gear',
  },
];

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => pathname === path;
  const isExpanded = (title: string) => expandedItems.includes(title);

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isItemActive = isActive(item.path);
    const isItemExpanded = isExpanded(item.title);

    return (
      <div key={item.path} className="nav-item">
        {hasChildren ? (
          <>
            <div
              className={`nav-link d-flex align-items-center justify-content-between ${
                isItemActive ? 'active' : ''
              }`}
              onClick={() => toggleSubmenu(item.title)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <i className={`bi ${item.icon} me-2`}></i>
                {item.title}
              </div>
              <i className={`bi ${isItemExpanded ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
            </div>
            {isItemExpanded && (
              <Nav className="flex-column ms-3 submenu">
                {item.children?.map(child => (
                  <Link 
                    key={child.path}
                    href={child.path}
                    className={`nav-link ${isActive(child.path) ? 'active' : ''}`}
                  >
                    <i className={`bi ${child.icon} me-2`}></i>
                    {child.title}
                  </Link>
                ))}
              </Nav>
            )}
          </>
        ) : (
          <Link
            href={item.path}
            className={`nav-link ${isItemActive ? 'active' : ''}`}
          >
            <i className={`bi ${item.icon} me-2`}></i>
            {item.title}
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className={`sidebar ${className}`}>
      <Nav className="flex-column p-3">
        {menuItems.map(renderMenuItem)}
      </Nav>
    </div>
  );
};

export default Sidebar;
