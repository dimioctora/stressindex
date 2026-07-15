import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  const isAuthPage = request.nextUrl.pathname === '/login'
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

  // If user is trying to access admin routes without a token, redirect to login
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If user is already logged in and tries to access login page, redirect to admin
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login'
  ]
}
