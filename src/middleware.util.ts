import {cookies} from 'next/headers';
import {NextRequest} from 'next/server';

export const getPathname = (req: NextRequest) => {
    const pathnameWithoutLocale = req.nextUrl.pathname.replace(
        /^\/en|^\/de/,
        '',
    );
    return pathnameWithoutLocale;
};

export const prependLocale = (pathname: string) => {
    const locale = cookies().get('locale')?.value || 'en';
    return `/${locale}${pathname}`;
};
