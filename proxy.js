import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Public routes - always allow
  const publicPaths = ['/login', '/register', '/'];
  const isPublic = publicPaths.includes(pathname) || 
                   pathname.startsWith('/api') || 
                   pathname.startsWith('/_next') ||
                   pathname.startsWith('/konsep') ||
                   pathname.startsWith('/algoritma') ||
                   pathname.startsWith('/ikhtiar') ||
                   pathname.startsWith('/studi-kasus') ||
                   pathname.startsWith('/kuis') ||
                   pathname.startsWith('/referensi') ||
                   pathname.startsWith('/planner') ||
                   pathname.includes('favicon.ico') ||
                   pathname.includes('.svg') ||
                   pathname.includes('.png') ||
                   pathname.includes('.ico');

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
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.svg$).*)',
  ],
};
