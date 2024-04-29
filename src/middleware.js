import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(req) {
  try {
    const pathname = '/' + req.url.substring(req.url.lastIndexOf('/') + 1)
    const cookie = cookies().get('token')
    const token = cookie ? cookie.value : null

    if (pathname === '/login' && !token) {
      return NextResponse.next()
    } else if (pathname === '/login' && token) {
      return NextResponse.redirect(new URL('/', req.url))
    } else {
      return NextResponse.next()
    }
  } catch (error) {

    return NextResponse.error()
  }
}

export const config = {
  matcher: ['/:path*']
}
