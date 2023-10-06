import {NextRequest, NextResponse} from 'next/server';
import {checkAuthRedirect} from './middleware.auth';
import {checkHomeRedirect} from './middleware.home';
import {checkLocaleRedirect} from './middleware.locale';
import {checkSubscriptionRedirect} from './middleware.subscription';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if (
        pathname.startsWith('/_next') ||
        pathname.includes('/api/') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    let redirectAction: null | NextResponse;
    redirectAction = checkLocaleRedirect(request);
    redirectAction = redirectAction || checkAuthRedirect(request);
    redirectAction = redirectAction || checkSubscriptionRedirect(request);
    redirectAction = redirectAction || checkHomeRedirect(request);

    console.log('-> ', redirectAction?.url || request.nextUrl.pathname);

    if (redirectAction) {
        return redirectAction;
    }

    return NextResponse.next();
}
