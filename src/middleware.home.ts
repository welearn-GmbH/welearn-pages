import {NextRequest, NextResponse} from 'next/server';
import {getPathname, prependLocale} from './middleware.util';

export const checkHomeRedirect = (req: NextRequest) => {
    if (!getPathname(req)) {
        req.nextUrl.pathname = prependLocale('/courses');
        return NextResponse.redirect(req.nextUrl);
    }

    return null;
};
