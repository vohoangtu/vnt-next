import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static files and images
  const isStaticFile = /\.(jpg|jpeg|png|gif|svg|ico|css|js)$/i.test(pathname);
  if (isStaticFile) {
    return NextResponse.next();
  }

  const isAuthenticated = request.cookies.has('access_token');

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/forgot-password', '/forgot-email'];
  const isPublicPath = publicPaths.includes(pathname);

  if (!isAuthenticated && !isPublicPath) {
    // Store the attempted URL to redirect back after login
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthenticated && isPublicPath) {
    // Redirect to dashboard if user is already logged in and tries to access login page
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|api|assets|favicon.ico).*)'
  ]
};
