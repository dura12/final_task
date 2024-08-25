import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log('Token:', token);
  console.log('Requested URL:', req.nextUrl.pathname);

  const isLoginPage = req.nextUrl.pathname === '/api/auth/signin';

  if (token) {
    if (isLoginPage) {
      console.log('Redirecting authenticated user away from login page.');
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  if (!isLoginPage) {
    console.log('Redirecting unauthenticated user to login page.');
    return NextResponse.redirect(new URL('/api/auth/signin', req.url));
  }

  return NextResponse.next();
}
