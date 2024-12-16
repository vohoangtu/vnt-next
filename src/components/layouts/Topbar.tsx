'use client';

import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

interface TopbarProps {
  onToggleSidebar?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Navbar bg="white" expand="lg" className="border-bottom shadow-sm py-2">
      <Container fluid className="px-4">
        <div className="d-flex align-items-center">
          <Link href="/dashboard" className="navbar-brand d-flex align-items-center me-3">
            <Image
              src="/logo.png"
              alt="Vietnam Tourist"
              width={80}
              height={40}
              className="me-2"
            />
          </Link>

          <Button
            variant="link"
            className="p-0 border-0 d-flex align-items-center"
            onClick={onToggleSidebar}
          >
            <i className="bi bi-list fs-4"></i>
          </Button>
        </div>

        <div className="d-flex align-items-center ms-auto">
          <div className="d-none d-lg-flex me-3">
            <div className="position-relative">
              <i className="bi bi-search text-muted position-absolute top-50 start-0 translate-middle-y ms-3"></i>
              <input
                type="text"
                className="form-control ps-5 pe-3"
                placeholder="Search..."
                style={{ borderRadius: '20px', width: '250px' }}
              />
            </div>
          </div>

          <Nav className="align-items-center">
            <div className="d-none d-lg-flex me-3">
              <button className="btn btn-link text-muted p-0 position-relative">
                <i className="bi bi-bell fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  2
                </span>
              </button>
            </div>

            <NavDropdown
              title={
                <div className="d-inline-flex align-items-center">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                       style={{ width: '32px', height: '32px' }}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="d-none d-lg-inline">{user?.name || 'User'}</span>
                </div>
              }
              id="basic-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item href="/dashboard/profile">
                <i className="bi bi-person me-2"></i>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="/dashboard/settings">
                <i className="bi bi-gear me-2"></i>
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="text-danger">
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Topbar;
