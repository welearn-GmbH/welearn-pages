import {NextRequest, NextResponse} from 'next/server';
import {getPathname, prependLocale} from './middleware.util';

const authRoutes = ['/courses', '/trainer', '/search', '/'];
const guestRoutes = ['/login', '/live-event'];

export const checkAuthRedirect = (
    request: NextRequest,
): NextResponse | null => {
    const {value: token} = request.cookies.get('token') ?? {value: null};

    const hasVerifiedToken = token;
    const pathname = getPathname(request);
    const isLogoutRoute = pathname === '/logout';
    const isGuestRoute = guestRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);

    if (isLogoutRoute) {
        request.nextUrl.pathname = prependLocale('/');
        const response = NextResponse.redirect(request.nextUrl);
        response.cookies.delete('token');
        response.cookies.delete('refresh_token');
        return response;
    }

    if (isAuthRoute && !hasVerifiedToken) {
        const fromPath = request.nextUrl.pathname;
        request.nextUrl.pathname = prependLocale('/login');
        const response = NextResponse.redirect(request.nextUrl);
        response.cookies.set('fromPath', fromPath);
        response.cookies.delete('token');
        response.cookies.delete('refresh_token');
        return response;
    }

    if (isGuestRoute && hasVerifiedToken) {
        request.nextUrl.pathname = prependLocale('/');
        const response = NextResponse.redirect(request.nextUrl);
        return response;
    }

    return null;
};
