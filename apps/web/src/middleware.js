import { NextResponse } from 'next/server'

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://ifeanyi-thor.netlify.app',
]

export function middleware(request) {
    const origin = request.headers.get('origin')

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
        const response = new NextResponse(null, { status: 204 })

        if (origin && allowedOrigins.includes(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin)
        }

        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response.headers.set('Access-Control-Max-Age', '86400') // 24 hours

        return response
    }

    // Handle actual requests
    const response = NextResponse.next()

    if (origin && allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin)
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    return response
}

// Configure which routes use this middleware
export const config = {
    matcher: '/api/:path*', // Apply to all API routes
}
