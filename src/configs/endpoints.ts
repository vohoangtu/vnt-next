export const endpoints = {
  public: [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
  ],
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  // Add other endpoint categories as needed
} as const;

export type PublicEndpoint = typeof endpoints.public[number];

export function isPublicEndpoint(url: string): boolean {
  return endpoints.public.some(endpoint => url?.includes(endpoint));
}
