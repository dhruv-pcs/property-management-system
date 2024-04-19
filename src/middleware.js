import { NextResponse } from 'next/server'
import { parseCookies } from 'nookies'

// Middleware function
export function middleware(req) {
  try {
    const cookies = parseCookies({ req })
    const token = cookies.token
    const pathname = req.url.split('?')[0]

    if (pathname === '/login') {
      return NextResponse.next()
    }

    if (token) {
      return NextResponse.next()
    }
  } catch (error) {
    console.error('Error in middleware:', error)

    return NextResponse.error()
  }
}

// Configuration for the middleware
export const config = {
  // Specify the path pattern to match
  matcher: ['/:path*']
}
