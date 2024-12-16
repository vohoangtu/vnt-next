'use client';

import ErrorPage from '@/components/ui/ErrorPage';

export default function Error() {
  return (
    <ErrorPage
      code="500"
      title="Internal Server Error"
      message="Sorry! Something went wrong on our end. We are working to fix the issue."
    />
  );
}
