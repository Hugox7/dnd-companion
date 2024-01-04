import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res })

  const { data: { user } } = await supabase.auth.getUser();

  // if user is not signed in redirect the user to /login
  if (!user) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // TODO handle redirect to home if logged in
  // if user is signed in and tries to access an unsigned route, redirected to home
  // const unsignedRoutes = ['/login'];
  // if (user && unsignedRoutes.includes(req.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL('/', req.url));
  // }

  return res;
}

export const config = {
  matcher: ['/app', '/app/character/:slug*'],
}