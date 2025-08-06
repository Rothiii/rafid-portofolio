import { NextRequest, NextResponse } from 'next/server';
import { trackConnection, releaseConnection, cleanupStaleConnections } from './src/lib/connection-limiter';

export async function middleware(request: NextRequest) {
  // Get client IP
  const ip = request.ip ?? 
    request.headers.get('x-forwarded-for')?.split(',')[0] ?? 
    request.headers.get('x-real-ip') ?? 
    '127.0.0.1';

  // Clean up stale connections periodically
  cleanupStaleConnections();

  // Check if connection is allowed
  if (!trackConnection(ip)) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Server is currently at capacity. Please try again later.',
        message: 'Too many concurrent connections. Please wait and try again.'
      }), 
      { 
        status: 503, // Service Unavailable
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60' // Suggest retry after 60 seconds
        }
      }
    );
  }

  // Add cleanup header to track when user leaves
  const response = NextResponse.next();
  response.headers.set('X-Client-IP', ip);
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
