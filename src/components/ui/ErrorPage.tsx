'use client';

import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ErrorPageProps {
  code: '404' | '500';
  title: string;
  message: string;
}

const errorImages = {
  '404': '/images/404.svg',
  '500': '/images/500.svg'
};

const ErrorPage: React.FC<ErrorPageProps> = ({ code, title, message }) => {
  const router = useRouter();

  return (
    <div className="error-page d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="text-center">
        <div className="mb-4">
          <Image
            src={errorImages[code]}
            alt={`${code} error`}
            width={300}
            height={300}
            priority
          />
        </div>
        <h1 className="error-code mb-3">{code}</h1>
        <h2 className="error-title mb-3">{title}</h2>
        <p className="error-message text-muted mb-4">{message}</p>
        <div className="d-flex gap-3 justify-content-center">
          <Button
            variant="primary"
            onClick={() => router.push('/')}
          >
            Go Home
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
