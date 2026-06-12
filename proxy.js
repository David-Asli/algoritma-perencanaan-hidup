import { NextResponse } from "next/server";

export default async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Public routes - always allow
  const publicPaths = ['/login', '/register'];
  const isPublic = publicPaths.includes(pathname) || 
                   pathname.startsWith('/api') || 
                   pathname.startsWith('/_next') ||
                   pathname.includes('favicon.ico');

  if (isPublic) {
    return NextResponse.next();
  }

  // Protected routes - require login cookie
  const hasSession = request.cookies.get('authjs.session-token') || 
                     request.cookies.get('__Secure-authjs.session-token') ||
                     request.cookies.get('next-auth.session-token') ||
                     request.cookies.get('__Secure-next-auth.session-token');

  if (!hasSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
