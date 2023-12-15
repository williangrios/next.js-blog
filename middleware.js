import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { URL } from 'url'

// export {default} from 'next-auth/middleware'


export const config = {
    matcher: [
        '/dashboard/:path*',
        '/api/user/:path*',
        '/api/admin/:path*',
    ]
}

// role based authorization
export default withAuth(async function middleware(req) {
    const url = req.nextUrl.pathname
    const userRole = req?.nextauth?.token?.user?.role
    // cors - allow other domains to access API
    if (url.includes('/api')) {
        NextResponse.next().headers.append('Access-Control-Allow-Origin', '*')
    }
    if (url?.includes('/admin') && userRole !== 'admin'){
        return NextResponse.redirect(new URL('/', req.url))
    }
}, {
    callbacks: {
        authorized:({token}) => {
            if (!token) {
                return false
            }
        }
    }
})