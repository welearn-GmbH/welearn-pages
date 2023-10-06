import {NextRequest, NextResponse} from 'next/server';

const paywallRoutes = ['/courses/'];

export const checkSubscriptionRedirect = (
    request: NextRequest,
): NextResponse | null => {
    return null;
};
