'use client';

import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <div className="page-header mb-4">
        <h1>Dashboard</h1>
        <p className="text-muted">Welcome back, {user?.name}!</p>
      </div>

      <Row className="g-4">
        <Col lg={3} sm={6}>
          <Card>
            <Card.Body>
              <h6 className="card-title">Total Bookings</h6>
              <h3>1,234</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} sm={6}>
          <Card>
            <Card.Body>
              <h6 className="card-title">Active Tours</h6>
              <h3>56</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} sm={6}>
          <Card>
            <Card.Body>
              <h6 className="card-title">Total Revenue</h6>
              <h3>$45.2K</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} sm={6}>
          <Card>
            <Card.Body>
              <h6 className="card-title">New Customers</h6>
              <h3>89</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
