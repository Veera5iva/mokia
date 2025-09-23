import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Generic middleware for Next.js
 * Can be extended later for authentication, logging, or other logic.
 */
export function middleware(request: NextRequest) {
  // Example: Log incoming requests
  console.log('Middleware hit:', request.nextUrl.pathname);

  // By default, just continue to the requested page
  return NextResponse.next();
}

// Define which paths this middleware applies to
export const config = {
  matcher: [
    '/',             // Homepage
    // '/profile',      // Example protected route
    // '/login',        // Login page
    // '/signup',       // Signup page
    // '/verifyemail',  // Email verification
    // '/api/webhook',  // Your Razorpay webhook endpoint
  ],
};
