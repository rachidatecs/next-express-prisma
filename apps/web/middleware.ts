import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    /*
     * Protecting all routes except static files and auth pages
     * Customize as needed
     */
    '/((?!.*\\..*|_next|sign-in|sign-up|api|favicon.ico).*)',
  ],
};
