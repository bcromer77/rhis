import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow access to /cover, static files, or API
  if (
    pathname.startsWith('/cover') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Redirect all other paths to /cover
  return NextResponse.redirect(new URL('/cover', request.url))
}

