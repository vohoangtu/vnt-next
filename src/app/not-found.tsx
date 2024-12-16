import ErrorPage from '@/components/ui/ErrorPage';

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      message="Oops! The page you are looking for might have been removed or is temporarily unavailable."
    />
  );
}
