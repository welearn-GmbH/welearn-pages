import {NextRequest, NextResponse} from 'next/server';

const locales = ['en', 'de'];
const defaultLocale = 'de';

export const checkLocaleRedirect = (
    request: NextRequest,
): NextResponse | null => {
    const pathname = request.nextUrl.pathname;
    const userLocale = defaultLocale; // todo

    if (
        pathname.startsWith(`/${userLocale}/`) ||
        pathname === `/${userLocale}`
    ) {
        return null;
    }

    request.nextUrl.pathname = `/${userLocale}${pathname}`;
    const response = NextResponse.redirect(request.nextUrl);
    response.cookies.set('locale', userLocale);
    return response;
};
